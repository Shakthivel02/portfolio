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
    markedForDeletion: boolean;
}

interface Enemy extends GameObject {
    speed: number;
    markedForDeletion: boolean;
}

export default function BattleGame({ onClose }: BattleGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(100);
    const [gameOver, setGameOver] = useState(false);

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
        let enemyTimer = 0;
        let lastTime = 0;
        let currentScore = 100;
        let isGameOver = false;

        // Input Handling
        const handleMouseMove = (e: MouseEvent) => {
            if (isGameOver) return;
            player.x = e.clientX;
            // keep player vertically fixed near bottom
        };

        const handleMouseClick = () => {
            if (isGameOver) return;
            // Fire projectile
            projectiles.push({
                x: player.x,
                y: player.y - player.height / 2,
                width: 4,
                height: 20,
                speed: 15,
                markedForDeletion: false
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseClick);

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

            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;

            // Difficulty scaling (10 min progression to impossible)
            const elapsedMins = timeStamp / 60000;
            // At 10 mins, speed multiplier reaches 6x (extremely fast drop)
            const speedMultiplier = 1 + (elapsedMins / 10) * 5;
            // At 10 mins, spawn interval drops from 1200ms to 50ms (~20 enemies/sec)
            const currentEnemyInterval = Math.max(50, 1200 - (elapsedMins / 10) * 1150);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // --- Draw Starfield Background (Simple) ---
            ctx.fillStyle = '#0b0b10';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Could add moving stars here later if desired

            // --- Handle Projectiles ---
            projectiles.forEach((p) => {
                p.y -= p.speed;

                // Draw laser
                ctx.fillStyle = '#FF2A2A'; // Red laser
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FF2A2A';
                ctx.fillRect(p.x - p.width / 2, p.y, p.width, p.height);
                ctx.shadowBlur = 0; // reset

                // Remove if off screen
                if (p.y < 0) p.markedForDeletion = true;
            });
            projectiles = projectiles.filter(p => !p.markedForDeletion);

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
                    currentScore = Math.max(0, currentScore - 20); // Penalty for missing
                    setScore(currentScore);
                    if (currentScore <= 0) {
                        isGameOver = true;
                        setGameOver(true);
                    }
                }

                // Check Collision with Projectiles
                projectiles.forEach(p => {
                    // Adjust projectile bounding box for centering
                    const pBox = { x: p.x - p.width / 2, y: p.y, width: p.width, height: p.height };
                    if (checkCollision(pBox, enemy) && !enemy.markedForDeletion && !p.markedForDeletion) {
                        enemy.markedForDeletion = true;
                        p.markedForDeletion = true;
                        currentScore += 10;
                        setScore(currentScore);
                    }
                });

                // Check Collision with Player (Game Over / Penalty)
                // Adjust player bounding box for centering
                const playerBox = { x: player.x - player.width / 2, y: player.y - player.height / 2, width: player.width, height: player.height };
                if (checkCollision(playerBox, enemy) && !enemy.markedForDeletion) {
                    enemy.markedForDeletion = true;
                    currentScore = Math.max(0, currentScore - 20); // Penalty for getting hit
                    setScore(currentScore);
                    if (currentScore <= 0) {
                        isGameOver = true;
                        setGameOver(true);
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
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const restartGame = () => {
        setScore(100);
        setGameOver(false);
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
                        <p>Missed 5 Troopers!</p>
                        <p>Final Score: {score}</p>
                        <RestartButton onClick={restartGame}>Retreat & Restart</RestartButton>
                    </GameOverMenu>
                )}
            </UIContainer>
        </GameOverlay>
    );
}
