import { useEffect, useRef, useState } from "react";
import playerImgSrc from "../assets/image/game/player.png";
import treeImgSrc from "../assets/image/game/tree.png";

const testCanvas = () => {
  const context = canvas.current.getContext("2d");
  // Line & Path
  // context.beginPath()
  // context.moveTo(20,20)
  // context.lineTo(120,20)
  // context.lineTo(120,120)
  // context.lineTo(20,120)
  // context.lineTo(20,20)
  // context.closePath()

  // context.lineWidth = 5
  // // line color
  // context.strokeStyle = 'red'
  // context.stroke()  // set stroke

  // // fill bg color
  // context.fillStyle='yellow'
  // context.fill()  // set color

  // rectangle -> fill, stroke
  // context.fillStyle = 'red'
  // context.fillRect(20,20, 50, 50)

  // context.strokeStyle = 'green'
  // context.strokeRect(100,20, 50, 50)

  // Text
  // context.font='bold normal 20px Arial'

  // context.fillStyle = 'red'
  // context.fillText('Hello wolrd1', 20, 20)

  // context.strokeStyle = 'orange'
  // context.strokeText('Hello wolrd2', 150, 20)

  // Image
  // const myImage = new Image()
  // myImage.src = player
  // myImage.onload = () => {
  //   context.drawImage(myImage, 20 ,20, 50, 50)
  // }
};

const Game = () => {
  const canvas = useRef(null);
  const [score, setScore] = useState(0);

  const initializeGame = () => {
    // Display Settings
    const context = canvas.current.getContext("2d");
    const boardW = 800;
    const boardH = 300;
    // Set Board Size
    canvas.current.width = boardW;
    canvas.current.height = boardH;

    // Player Setting
    const playerW = 64;
    const playerH = 64;
    const playerX = 50;
    const playerY = boardH - playerH;
    const playerImg = new Image();
    playerImg.src = playerImgSrc;

    const player = {
      x: playerX,
      y: playerY,
      w: playerW,
      h: playerH,
    };
    // Draw Player (mounting)
    playerImg.onload = () => {
      context.drawImage(playerImg, player.x, player.y, playerW, playerH);
    };

    // Physics Settings
    let velocityY = 0; // ความแรงการกระโดด
    let gravity = 0.23;

    // Enemie Setting (Tree)
    const treeW = 70;
    const treeH = 105;
    let treeX = 750;
    let treeY = boardH - treeH;
    const treeImg = new Image();
    treeImg.src = treeImgSrc;

    const treeArray = []; // contain all the tree object
    let treeSpeed = -3;

    // Game Status Setting
    let gameover = false;

    // Updating Game Frame (Handle Animation Logic here!)
    requestAnimationFrame(function update() {
      requestAnimationFrame(update); // Recursive Infinte Loop
      if (gameover) return;
      context.clearRect(0, 0, boardW, boardH); // Clear Board

      // Player Object
      velocityY += gravity; // ในแต่ละ frame ความแรงจะถูกหักกับแรงโน้มถ่วงจนเป็น 0 และถูกดึงลงพื้นในที่สุด
      player.y = Math.min(player.y + velocityY, playerY); // limit player down

      // Enemie Object
      for (let i = 0; i < treeArray.length; i++) {
        const tree = treeArray[i];
        tree.x += treeSpeed;
        context.drawImage(tree.img, tree.x, tree.y, tree.w, tree.h);
        // If collision game over
        if (onEnemieCollision(player, tree)) {
          gameover = true;
          context.font = "normal bold 20px Arial";
          context.textAlign = "center";
          context.fillText("Game Over!", boardW / 2, boardH / 2);
        }
        if (onScoreCollision(player, tree)) {
          setScore((state) => state + 1);
        }
      }

      context.drawImage(playerImg, player.x, player.y, player.w, player.h); // Draw Updated Player (updating)
    });

    let c = 0
    // Generate Enemie every 3 second
    setInterval(() => {
      console.log(c++)
      if (gameover) return;
      const tree = {
        img: treeImg,
        x: treeX,
        y: treeY,
        w: treeW,
        h: treeH,
      };
      treeArray.push(tree);
      if (treeArray.length > 5) {
        treeArray.shift();
      }
      // console.log(treeArray)
    }, 1000);

    // speed up
    const sepedInterval =  setInterval(() => {
      treeSpeed -= 0.5;
    }, 1000 * 1);

    // Collection Checker
    function onEnemieCollision(obj1, obj2) {
      return (
        obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.y + obj1.h > obj2.y
      );
    }
    function onScoreCollision(obj1, obj2) {
      return obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x;
    }

    // Listen to player keyboard
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && player.y < playerY) {
        resetGame();
      } else if (e.code === "KeyW" && player.y === playerY) {
        velocityY = -10;
      }
       else if (e.code === "KeyS" && player.y < playerY) {
        velocityY = 50;
      } 
       else if (e.code === "KeyQ") {
        console.log('Active Skill')
        treeArray.splice(0,treeArray.length);
      }
    });
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <section className="bg-base-100 max-w-screen-xl mx-auto py-14">
      <div className="mx-auto flex flex-col items-center">
        <div className=" "></div>
        <h1 className="text-3xl mb-5">Score : {score} </h1>
        <canvas
          className="bg-blue-100 border-b-[15px] border-b-orange-950 "
          ref={canvas}
        ></canvas>
        <button className="btn mt-4" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </section>
  );
};

// const Game = () => {
//     const canvas = useRef(null);
//     const [score, setScore] = useState(0);
//     const gameState = useRef({
//       velocityY: 0,
//       treeArray: [],
//       gameover: false,
//     });

//     const resetGame = () => {
//       setScore(0);
//       gameState.current = {
//         velocityY: 0,
//         treeArray: [],
//         gameover: false,
//       };
//       initializeGame();
//     };

//     const initializeGame = () => {
//       const context = canvas.current.getContext("2d");
//       const boardW = 800;
//       const boardH = 300;

//       // Set Board Size
//       canvas.current.width = boardW;
//       canvas.current.height = boardH;

//       // Player Settings
//       const playerW = 64;
//       const playerH = 64;
//       const playerX = 50;
//       const playerY = boardH - playerH;
//       const playerImg = new Image();
//       playerImg.src = playerImgSrc;

//       const player = {
//         x: playerX,
//         y: playerY,
//         w: playerW,
//         h: playerH,
//       };

//       // Enemie Settings
//       const treeW = 70;
//       const treeH = 105;
//       const treeX = 750;
//       const treeY = boardH - treeH;
//       const treeImg = new Image();
//       treeImg.src = treeImgSrc;

//       let gravity = 0.23;
//       let treeSpeed = -3;

//       const update = () => {
//         if (gameState.current.gameover) return;
//         context.clearRect(0, 0, boardW, boardH);

//         // Player Logic
//         gameState.current.velocityY += gravity;
//         player.y = Math.min(player.y + gameState.current.velocityY, playerY);

//         // Draw Player
//         context.drawImage(playerImg, player.x, player.y, player.w, player.h);

//         // Enemie Logic
//         for (let i = 0; i < gameState.current.treeArray.length; i++) {
//           const tree = gameState.current.treeArray[i];
//           tree.x += treeSpeed;
//           context.drawImage(tree.img, tree.x, tree.y, tree.w, tree.h);

//           // Collision Logic
//           if (onEnemieCollision(player, tree)) {
//             gameState.current.gameover = true;
//             context.font = "normal bold 20px Arial";
//             context.textAlign = "center";
//             context.fillText("Game Over!", boardW / 2, boardH / 2);
//           }
//           if (onScoreCollision(player, tree)) {
//             setScore((prev) => prev + 1);
//           }
//         }

//         requestAnimationFrame(update);
//       };

//       const spawnTree = () => {
//         if (gameState.current.gameover) return;
//         const tree = { img: treeImg, x: treeX, y: treeY, w: treeW, h: treeH };
//         gameState.current.treeArray.push(tree);
//         if (gameState.current.treeArray.length > 5) {
//           gameState.current.treeArray.shift();
//         }
//       };

//       const onEnemieCollision = (obj1, obj2) => {
//         return (
//           obj1.x < obj2.x + obj2.w &&
//           obj1.x + obj1.w > obj2.x &&
//           obj1.y < obj2.y + obj2.h &&
//           obj1.y + obj1.h > obj2.y
//         );
//       };

//       const onScoreCollision = (obj1, obj2) => {
//         return obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x;
//       };

//       const handleKeyDown = (e) => {
//         if (gameState.current.gameover) return;
//         if (e.code === "Space" && player.y === playerY) {
//           gameState.current.velocityY = -10;
//         }
//       };

//       document.addEventListener("keydown", handleKeyDown);
//       const treeInterval = setInterval(spawnTree, 3000);
//       requestAnimationFrame(update);

//       return () => {
//         document.removeEventListener("keydown", handleKeyDown);
//         clearInterval(treeInterval);
//       };
//     };

//     useEffect(() => {
//       initializeGame();
//       return resetGame;
//     }, []);

//     return (
//       <section className="bg-base-100 max-w-screen-xl mx-auto py-14">
//         <div className="mx-auto flex flex-col items-center">
//           <h1 className="text-3xl mb-5">Score: {score}</h1>
//           <canvas
//             className="bg-blue-100 border-b-[15px] border-b-orange-950 w-[800px] h-[300px]"
//             ref={canvas}
//           ></canvas>
//           <button className="btn mt-4" onClick={resetGame}>
//             Reset Game
//           </button>
//         </div>
//       </section>
//     );
// };

export default Game;
