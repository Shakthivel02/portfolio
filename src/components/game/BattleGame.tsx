import { useEffect, useRef, useState } from 'react';
import spaceImgUrl from '../../assets/space.png';
import enemyImgUrl from '../../assets/icons8-stormtrooper-48.png';
import { GameOverlay, GameCanvas, UIContainer, ScoreBoard, RetreatButton, GameOverMenu, RestartButton } from './BattleGame.styles';

interface BattleGameProps {
    onClose: () => void;
}

interface GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Projectile extends GameObject {
    speed: number;
    vx: number;
    vy: number;
    markedForDeletion: boolean;
    isPiercing?: boolean;
}

interface Enemy extends GameObject {
    speed: number;
    markedForDeletion: boolean;
}

type PowerUpType = 'spread' | 'lightning';

interface PowerUp extends GameObject {
    speed: number;
    markedForDeletion: boolean;
    type: PowerUpType;
}

interface LightningBolt {
    points: { x: number, y: number }[];
    life: number;
    maxLife: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    maxLife: number;
    color: string;
}

interface FloatingText {
    text: string;
    x: number;
    y: number;
    life: number;
    maxLife: number;
    color: string;
}

export default function BattleGame({ onClose }: BattleGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(100);
    const [gameOver, setGameOver] = useState(false);
    const [survivalTime, setSurvivalTime] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Image Assets
        const playerImg = new Image();
        playerImg.src = spaceImgUrl;

        const enemyImg = new Image();
        enemyImg.src = enemyImgUrl;

        // Game State
        let animationFrameId: number;

        const player = {
            x: canvas.width / 2,
            y: canvas.height - 100,
            width: 64,  // scaled down slightly
            height: 64
        };

        let projectiles: Projectile[] = [];
        let enemies: Enemy[] = [];
        let particles: Particle[] = [];
        let floatingTexts: FloatingText[] = [];
        let powerUps: PowerUp[] = [];
        let lightningBolts: LightningBolt[] = [];
        let enemyTimer = 0;
        let powerUpTimer = 0;
        let lastTime = 0;
        let currentScore = 100;
        let isGameOver = false;
        let gameStartTime = 0;
        let powerUpEndTime = 0;
        let currentPowerUpType: PowerUpType | 'none' = 'none';

        const createParticles = (x: number, y: number, color: string, count: number, speedModifier: number = 1) => {
            for (let i = 0; i < count; i++) {
                particles.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * (Math.random() * 10 * speedModifier),
                    vy: (Math.random() - 0.5) * (Math.random() * 10 * speedModifier),
                    size: Math.random() * 3 + 1,
                    life: 100,
                    maxLife: 100,
                    color
                });
            }
        };

        const createFloatingText = (text: string, x: number, y: number, color: string) => {
            floatingTexts.push({
                text,
                x,
                y,
                life: 100,
                maxLife: 100,
                color
            });
        };

        // Input Handling
        const handleMouseMove = (e: MouseEvent) => {
            if (isGameOver) return;
            e.stopPropagation();
            player.x = e.clientX;
            // keep player vertically fixed near bottom
        };

        const handleMouseClick = (e?: MouseEvent) => {
            if (isGameOver) return;
            if (e) {
                e.stopPropagation();
            }

            const isPoweredUp = Date.now() < powerUpEndTime;

            if (isPoweredUp && currentPowerUpType === 'spread') {
                // Fire spread shot (5 lasers at different angles)
                createParticles(player.x, player.y - player.height / 2, '#FF2A2A', 10, 1.0);

                const angles = [-0.4, -0.2, 0, 0.2, 0.4]; // Radians
                const baseSpeed = 15;

                angles.forEach(angle => {
                    projectiles.push({
                        x: player.x,
                        y: player.y - player.height / 2,
                        width: 4,
                        height: 20,
                        speed: baseSpeed,
                        vx: Math.sin(angle) * baseSpeed,
                        vy: -Math.cos(angle) * baseSpeed,
                        markedForDeletion: false,
                        isPiercing: false // Standard lasers, just more of them
                    });
                });
            } else if (isPoweredUp && currentPowerUpType === 'lightning') {
                // Force Lightning (Hitscan Chain Attack)
                let currentPos = { x: player.x, y: player.y - player.height / 2 };
                let chainCount = 0;
                const maxChain = 4;
                const hitEnemies: Enemy[] = [];
                const points = [{ x: currentPos.x, y: currentPos.y }];

                while (chainCount < maxChain) {
                    let closestDist = Infinity;
                    let closestEnemy: Enemy | null = null;

                    for (const e of enemies) {
                        if (e.markedForDeletion || hitEnemies.includes(e)) continue;
                        const dist = Math.hypot(e.x + e.width / 2 - currentPos.x, e.y + e.height / 2 - currentPos.y);
                        if (dist < closestDist && dist < 1200) { // Increased jump range to cover screen
                            closestDist = dist;
                            closestEnemy = e;
                        }
                    }

                    if (closestEnemy) {
                        hitEnemies.push(closestEnemy);
                        currentPos = { x: closestEnemy.x + closestEnemy.width / 2, y: closestEnemy.y + closestEnemy.height / 2 };
                        points.push({ ...currentPos });
                        chainCount++;
                    } else {
                        break;
                    }
                }

                if (points.length > 1) {
                    // Draw Lightning
                    lightningBolts.push({ points, life: 100, maxLife: 100 });

                    // Damage hit enemies
                    hitEnemies.forEach(e => {
                        e.markedForDeletion = true;
                        createParticles(e.x + e.width / 2, e.y + e.height / 2, '#B42AFA', 20, 1.5);
                        createFloatingText('+10', e.x + e.width / 2, e.y, '#B42AFA');
                        currentScore += 10;
                    });
                    setScore(currentScore);
                } else {
                    // Shoot a dud lightning bolt straight up if no enemies nearby
                    lightningBolts.push({
                        points: [
                            { x: currentPos.x, y: currentPos.y },
                            { x: currentPos.x + (Math.random() - 0.5) * 50, y: currentPos.y - 150 }
                        ],
                        life: 100, maxLife: 100
                    });
                }

            } else {
                // Muzzle flash particles
                createParticles(player.x, player.y - player.height / 2, '#00E5FF', 5, 0.5);

                // Fire standard projectile
                projectiles.push({
                    x: player.x,
                    y: player.y - player.height / 2,
                    width: 4,
                    height: 20,
                    speed: 15,
                    vx: 0,
                    vy: -15, // Straight up
                    markedForDeletion: false
                });
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                handleMouseClick();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseClick);
        window.addEventListener('keydown', handleKeyDown);

        // Collision Detection (simple AABB)
        const checkCollision = (rect1: GameObject, rect2: GameObject) => {
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            );
        };

        // Game Loop
        const animate = (timeStamp: number) => {
            if (isGameOver) return; // Stop drawing if game is over
            if (gameStartTime === 0) gameStartTime = timeStamp;

            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;

            // Difficulty scaling (10 min progression to impossible)
            const elapsedMins = (timeStamp - gameStartTime) / 60000;
            // At 10 mins, speed multiplier reaches 6x (extremely fast drop)
            const speedMultiplier = 1 + (elapsedMins / 10) * 5;
            // At 10 mins, spawn interval drops from 1200ms to 50ms (~20 enemies/sec)
            const currentEnemyInterval = Math.max(50, 1200 - (elapsedMins / 10) * 1150);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background is now transparent (handled by CSS) so we only clear rect
            // --- Handle Particles ---
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= deltaTime * 0.15; // decay speed

                ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0; // reset
            particles = particles.filter(p => p.life > 0);

            // --- Handle Floating Texts ---
            floatingTexts.forEach(ft => {
                ft.y -= deltaTime * 0.05; // float upwards
                ft.life -= deltaTime * 0.1; // decay

                // Fade out
                ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
                ctx.fillStyle = ft.color;
                ctx.font = 'bold 24px "JetBrains Mono", monospace';
                ctx.textAlign = 'center';
                ctx.fillText(ft.text, ft.x, ft.y);
            });
            ctx.globalAlpha = 1.0;
            floatingTexts = floatingTexts.filter(ft => ft.life > 0);

            // --- Handle Lightning Bolts ---
            lightningBolts.forEach(bolt => {
                bolt.life -= deltaTime * 0.4; // Decay fast

                if (bolt.points.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(bolt.points[0].x, bolt.points[0].y);

                    // Add some jaggedness
                    for (let i = 1; i < bolt.points.length; i++) {
                        const p2 = bolt.points[i];

                        // Just draw straight lines between targets for now, as it's very fast
                        ctx.lineTo(p2.x, p2.y);
                    }

                    ctx.strokeStyle = '#B42AFA';
                    ctx.lineWidth = 4;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#B42AFA';
                    ctx.globalAlpha = Math.max(0, bolt.life / bolt.maxLife);
                    ctx.stroke();

                    // Inner white core
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 2;
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            });
            ctx.globalAlpha = 1.0;
            lightningBolts = lightningBolts.filter(b => b.life > 0);

            // --- Handle Projectiles ---
            projectiles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Draw laser (always red now)
                ctx.save();
                ctx.translate(p.x, p.y);
                // Calculate rotation based on velocity
                const angle = Math.atan2(p.vy, p.vx) + Math.PI / 2; // +90deg because drawn vertically
                ctx.rotate(angle);

                ctx.fillStyle = '#FF2A2A';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FF2A2A';
                ctx.fillRect(-p.width / 2, 0, p.width, p.height);
                ctx.shadowBlur = 0; // reset
                ctx.restore();

                // Remove if off screen
                if (
                    p.y + p.height < 0 ||
                    p.x < 0 ||
                    p.x > canvas.width ||
                    p.y > canvas.height
                ) {
                    p.markedForDeletion = true;
                }
            });
            projectiles = projectiles.filter(p => !p.markedForDeletion);

            // --- Handle PowerUps ---
            if (powerUpTimer > 35000 + Math.random() * 5000) { // Spawn every 35-40 seconds
                // 50/50 chance for Spread vs Lightning
                const type: PowerUpType = Math.random() > 0.5 ? 'spread' : 'lightning';
                powerUps.push({
                    x: Math.random() * (canvas.width - 40) + 20,
                    y: -50,
                    width: 30,
                    height: 30,
                    speed: 3 * Math.min(3, speedMultiplier), // Scale speed up a bit with difficulty but max 3x base
                    markedForDeletion: false,
                    type
                });
                powerUpTimer = 0;
            } else {
                powerUpTimer += deltaTime;
            }

            powerUps.forEach(pu => {
                pu.y += pu.speed;
                const orbColor = pu.type === 'spread' ? '#2EFA41' : '#B42AFA';

                // Draw PowerUp
                ctx.save();
                ctx.translate(pu.x, pu.y);

                // Pulsing and rotation effects
                const pulse = 1 + Math.sin(timeStamp / 200) * 0.2;
                const rotation = timeStamp / 1000;

                ctx.shadowBlur = 20;
                ctx.shadowColor = orbColor;

                if (pu.type === 'spread') {
                    // Spinning 3-pointed star / triangle for spread
                    ctx.rotate(rotation);
                    ctx.scale(pulse, pulse);

                    ctx.beginPath();
                    for (let i = 0; i < 3; i++) {
                        const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
                        const x = Math.cos(angle) * (pu.width / 1.5);
                        const y = Math.sin(angle) * (pu.width / 1.5);
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();

                    ctx.fillStyle = orbColor;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.stroke();

                    // Inner core
                    ctx.beginPath();
                    ctx.arc(0, 0, pu.width / 4, 0, Math.PI * 2);
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fill();
                } else {
                    // Spinning diamond for lightning
                    ctx.rotate(-rotation * 2);
                    ctx.scale(pulse, pulse);

                    ctx.beginPath();
                    ctx.moveTo(0, -pu.width / 1.2);
                    ctx.lineTo(pu.width / 1.5, 0);
                    ctx.lineTo(0, pu.width / 1.2);
                    ctx.lineTo(-pu.width / 1.5, 0);
                    ctx.closePath();

                    ctx.fillStyle = orbColor;
                    ctx.fill();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.stroke();

                    // Inner electric core
                    ctx.rotate(rotation * 4);
                    ctx.beginPath();
                    ctx.moveTo(0, -pu.width / 3);
                    ctx.lineTo(pu.width / 3, 0);
                    ctx.lineTo(0, pu.width / 3);
                    ctx.lineTo(-pu.width / 3, 0);
                    ctx.closePath();
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fill();
                }

                ctx.restore();

                if (pu.y > canvas.height) pu.markedForDeletion = true;

                // Check collision with player
                const playerBox = { x: player.x - player.width / 2, y: player.y - player.height / 2, width: player.width, height: player.height };
                if (checkCollision(playerBox, pu) && !pu.markedForDeletion) {
                    pu.markedForDeletion = true;
                    powerUpEndTime = Date.now() + 10000; // 10 seconds of power
                    currentPowerUpType = pu.type;

                    const text = pu.type === 'spread' ? 'SPREAD SHOT!' : 'FORCE LIGHTNING!';
                    createFloatingText(text, player.x, player.y - 60, orbColor);
                    createParticles(player.x, player.y, orbColor, 30, 2);
                }
            });
            powerUps = powerUps.filter(pu => !pu.markedForDeletion);

            // --- Handle Enemies ---
            if (enemyTimer > currentEnemyInterval) {
                enemies.push({
                    x: Math.random() * (canvas.width - 48), // random x pos
                    y: -50, // spawn above screen
                    width: 48,
                    height: 48,
                    speed: (Math.random() * 2 + 2) * speedMultiplier,
                    markedForDeletion: false
                });
                enemyTimer = 0;
            } else {
                enemyTimer += deltaTime;
            }

            enemies.forEach((enemy) => {
                enemy.y += enemy.speed;

                // Draw enemy
                if (enemyImg.complete) {
                    ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
                } else {
                    // Fallback box
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                }

                // Remove if off screen
                if (enemy.y > canvas.height) {
                    enemy.markedForDeletion = true;

                    // Missed enemy text
                    createFloatingText('-20', enemy.x + enemy.width / 2, canvas.height - 20, '#FF2A2A');

                    currentScore = Math.max(0, currentScore - 20); // Penalty for missing
                    setScore(currentScore);
                    if (currentScore <= 0) {
                        isGameOver = true;
                        setGameOver(true);
                        setSurvivalTime(Math.floor((timeStamp - gameStartTime) / 1000));
                    }
                }

                // Check Collision with Projectiles
                projectiles.forEach(p => {
                    // Adjust projectile bounding box for centering
                    const pBox = { x: p.x - p.width / 2, y: p.y, width: p.width, height: p.height };
                    if (checkCollision(pBox, enemy) && !enemy.markedForDeletion && !p.markedForDeletion) {
                        enemy.markedForDeletion = true;
                        if (!p.isPiercing) {
                            p.markedForDeletion = true;
                        }

                        // Explosion particles
                        createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#FF2A2A', 15, 1);
                        createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#FFAA00', 5, 1.5);

                        // Score text
                        createFloatingText('+10', enemy.x + enemy.width / 2, enemy.y, '#00E5FF');

                        currentScore += 10;
                        setScore(currentScore);
                    }
                });

                // Check Collision with Player (Game Over / Penalty)
                // Adjust player bounding box for centering
                const playerBox = { x: player.x - player.width / 2, y: player.y - player.height / 2, width: player.width, height: player.height };
                if (checkCollision(playerBox, enemy) && !enemy.markedForDeletion) {
                    enemy.markedForDeletion = true;

                    // Large hit explosion
                    createParticles(player.x, player.y, '#FF2A2A', 20, 1.5);
                    createParticles(player.x, player.y, '#E5B13A', 10, 2);

                    // Penalty text
                    createFloatingText('-20', player.x, player.y - 40, '#FF2A2A');

                    currentScore = Math.max(0, currentScore - 20); // Penalty for getting hit
                    setScore(currentScore);
                    if (currentScore <= 0) {
                        isGameOver = true;
                        setGameOver(true);
                        setSurvivalTime(Math.floor((timeStamp - gameStartTime) / 1000));
                    }
                }
            });
            enemies = enemies.filter(e => !e.markedForDeletion);

            // --- Draw Player ---
            if (playerImg.complete) {
                ctx.save();
                ctx.translate(player.x, player.y);
                // Draw centered
                ctx.drawImage(playerImg, -player.width / 2, -player.height / 2, player.width, player.height);
                ctx.restore();
            } else {
                // Fallback box
                ctx.fillStyle = '#00E5FF';
                ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
            }

            if (!isGameOver) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseClick);
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const restartGame = () => {
        setScore(100);
        setGameOver(false);
        setSurvivalTime(0);
        onClose();
    };

    return (
        <GameOverlay>
            <GameCanvas ref={canvasRef} />
            <UIContainer>
                <ScoreBoard>SCORE: {score}</ScoreBoard>
                <RetreatButton onClick={onClose}>Retreat</RetreatButton>

                {gameOver && (
                    <GameOverMenu>
                        <h2>GAME OVER</h2>
                        <p>Shields Depleted!</p>
                        <p>Survived: {survivalTime} seconds</p>
                        <RestartButton onClick={restartGame}>Retreat & Restart</RestartButton>
                    </GameOverMenu>
                )}
            </UIContainer>
        </GameOverlay>
    );
}
