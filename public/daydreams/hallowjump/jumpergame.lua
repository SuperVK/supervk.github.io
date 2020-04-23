-- title: HallowJump
-- author: SuperVK
-- desc: a simple halloween themed jumping game
-- script: lua

baseY = 99
playerY = 0
speed = 1
playerX = 20
jumping = false
jumpT = 0 
jumpSoundPlayed = false
t = 0
p = 30
highScore = 0
crouching = false
witchHeight = 7
paused = false

collisionPoints = {{23, 15}, {29, 15}, {29, 10}}

--0: main menu
--1: play mode
--2: game over screen

gameState = 0
menuSelected = 0

function init() 
    nextObstTime = t + 60
    obstacles = {}
    groundX = 0
    score = 0
    gameStarted = true
end

init()


function TIC()
    t = t+1
    if gameState == 0 then
        mainMenu()
    elseif gameState == 1 then
        gameTick()
    elseif gameState == 2 then
        gameOver()
    elseif gameState == 3 then
        info()
    end 
    
end

function gameOver() 
    print('Game over!', 240/2-55/2, 136/2-10, 6)
    print('Press A or Enter to start over!', 240/2-171/2, 136/2, 6)
    print('Press X or Backspace to return to main menu!', 240/2-242/2, 136/2+10, 6)
    if btnp(4) or keyp(50) then 
        init()
        gameState = 1
    elseif btnp(6) or keyp(51) then
        
        gameState = 0
    end
end

function mainMenu()

    if btnp(4) or keyp(50) then
        if menuSelected == 0 or menuSelected == 1 then
            init()
            gameState = 1
        elseif menuSelected == 2 then
            gameState = 3
        end
    end

    if btnp(2) and menuSelected == 1 then
        if speed == 1 then
            speed = 3
        else speed = speed - 1 end
    elseif btnp(3) and menuSelected == 1 then
        if speed == 3 then
            speed = 1
        else speed = speed + 1 end
    end

    if btnp(0) then
        if menuSelected == 0 then
            menuSelected = 2
        else menuSelected = menuSelected - 1 end
    elseif btnp(1) then
        if menuSelected == 2 then
            menuSelected = 0
        else menuSelected = menuSelected + 1 end
    end

    if speed == 1 then
        mode = 'Easy'
        width = print('Easy')
    elseif speed == 2 then
        mode = 'Normal'
        width = print('Normal')
    elseif speed == 3 then
        mode = 'Hard'
        width = print('Hard')
    end

    cls()
    rect(0,0,240,136,0)
    print('HallowJump', 240/2-58/2, 136/2-40, 9)
    if math.floor(t/15)%2 ~= 0 and menuSelected == 0 then 
        print('Press A or Enter to start!', 240/2-143/2, 136/2-10, 6)
    else
        print('Press A or Enter to start!', 240/2-143/2, 136/2-10)
    end
    if math.floor(t/15)%2 ~= 0 and menuSelected == 1 then
        print(mode, 240/2-width/2, 136/2, 6)
        tri(240/2-35/2-10, 136/2+2,   240/2-35/2-4, 136/2,   240/2-35/2-4, 136/2+4, 6)
        tri(240/2+35/2+10, 136/2+2,   240/2+35/2+4, 136/2,   240/2+35/2+4, 136/2+4, 6)
    else
        print(mode, 240/2-width/2, 136/2)
        tri(240/2-35/2-10, 136/2+2,   240/2-35/2-4, 136/2,   240/2-35/2-4, 136/2+4, 15)
        tri(240/2+35/2+10, 136/2+2,   240/2+35/2+4, 136/2,   240/2+35/2+4, 136/2+4, 15)
    end
    if math.floor(t/15)%2 ~= 0 and menuSelected == 2 then
        print('Info', 240/2-23/2, 136/2+10, 6)
    else
        print('Info', 240/2-23/2, 136/2+10)
    end     
    

    
end

function info() 
    cls()
    print('A or Arrow up to jump!\nX or Arrow down to crouch!\nY or Backspace to pause!\n\nMade by: SuperVK\nTwitter: @SuperVK_\nDiscord: SuperVK#0991\n\nPress Y or Backspace to return')
    --print('Made by: SuperVK\nTwitter: @SuperVK_\nDiscord: SuperVK#0991')
    if btnp(4) or keyp(51) then 
        gameState = 0
    end
end

function gameTick()
    --t = t+1
    if btnp(7) or keyp(51) then
        if paused then paused = false else paused = true end

    end
    if paused then 
        print('Press Y or Backspace to resume!', 240/2-148/2, 136/2)
        return 
    end
    groundX = groundX - speed
    if groundX == -240 then
        groundX = 0
    end
    if jumping then jump() end

    if nextObstTime == t then
        if math.random() > 0.8 then
            table.insert(obstacles, {240, 1})
        else 
            if math.random() > 0.5 then table.insert(obstacles, {240, 0})
            else table.insert(obstacles, {240, 2}) end
        end

        nextObstTime = t + math.random(90/speed, 120/speed)
    end
    if btn(4) or key(48) or key(58) then 
        --sfx(1, 'F-4', 6)
        jumping = true
    end

    if  btn(6) or key(59) then
        crouching = true
    else 
        crouching = false
    end
    

    cls()

    --map
    map(0, 0, 100, 100, groundX, 0, 0)
    

    
    --obstacles

    for i = 1, #obstacles do
        --trace(math.floor(obstacles[obst]))
        obst = obstacles[i]
        

        if obst[2] == 0 then
            spr(258,obst[1], baseY-16, 15, 2)
            spr(259,obst[1]+16, baseY-16, 15, 2)
            spr(274,obst[1], baseY, 15, 2)
            spr(275,obst[1]+16, baseY, 15, 2)
        elseif obst[2] == 2 then
            spr(260,obst[1], baseY-16, 15, 2)
            spr(261,obst[1]+16, baseY-16, 15, 2)
            spr(276,obst[1], baseY, 15, 2)
            spr(277,obst[1]+16, baseY, 15, 2)


        elseif obst[2] == 1 then
            if math.floor(t/10)%2 == 0 then
                spr(290,obst[1],    baseY-16-witchHeight, 15, 2)
                spr(291,obst[1]+16, baseY-16-witchHeight, 15, 2)
                spr(306,obst[1],    baseY-witchHeight,    15, 2)
                spr(307,obst[1]+16, baseY-witchHeight,    15, 2)
            else 
                spr(292,obst[1],    baseY-16-witchHeight, 15, 2)
                spr(293,obst[1]+16, baseY-16-witchHeight, 15, 2)
                spr(308,obst[1],    baseY-witchHeight,    15, 2)
                spr(309,obst[1]+16, baseY-witchHeight,    15, 2)

            end
        end
        
        obstacles[i][1] = obst[1] - speed

        if not crouching and obst[2] == 1 and obst[1] > 5 and obst[1] < 27 then
            sfx(0, 'F-2', 30)
            gameState = 2
            
        end

        
        
    end

    --character
    


    if crouching then
        --trace('crouch')
        if math.floor(t/10)%2 == 0 then
            spr(320,    playerX,    baseY+playerY,    0)
            spr(321,    playerX+8,  baseY+playerY,    0)
            spr(336,    playerX,    baseY+playerY+8,  0)
            spr(337,    playerX+8,  baseY+playerY+8,  0)
        else
            spr(352,    playerX,    baseY+playerY,    0)
            spr(353,    playerX+8,  baseY+playerY,    0)
            spr(368,    playerX,    baseY+playerY+8,  0)
            spr(369,    playerX+8,  baseY+playerY+8,  0)
        end

    elseif math.floor(t/10)%2 == 0 then
        spr(256,    playerX,      baseY+playerY,    0)
        spr(257,    playerX+8,    baseY+playerY,    0)
        spr(272,    playerX,      baseY+playerY+8,  0)
        spr(273,    playerX+8,    baseY+playerY+8,  0)
    else 
        spr(288,    playerX,    baseY+playerY,    0)
        spr(289,    playerX+8,  baseY+playerY,    0)
        spr(304,    playerX,    baseY+playerY+8,  0)
        spr(305,    playerX+8,  baseY+playerY+8,  0)
    end
   -- spr(258, 8, 8)
    print('High Score: ' .. highScore, 5, 125)
    print(score, 110, 5)
    --get pixel next to collision points
    if pix(collisionPoints[1][1], baseY+collisionPoints[1][2]+playerY+1) == 9 or pix(collisionPoints[2][1]+1, baseY+collisionPoints[2][2]+playerY) == 9 or pix(collisionPoints[3][1]+1, baseY+collisionPoints[3][2]+playerY) == 9 or pix(collisionPoints[2][1], baseY+collisionPoints[2][2]+playerY+1) == 9 then
        sfx(0, 'F-2', 30)
        gameState = 2
        return
    end

    for i = 1, #obstacles do
        if obstacles[i][1] < -32 then 
            score = score + 1
            table.remove(obstacles, 1)
            i = i-1
            break
        end
    end

    
    if score > highScore then
        highScore = score
    end
end

function jump() 
    if not jumpSoundPlayed then
        sfx(1, 'F-4', 6)
        jumpSoundPlayed = true
    end
    jumpT = jumpT + 1
    q = (p/speed)
    y = 1/q*(speed-0.3)*jumpT^2-60/q*jumpT
   
    if y > 0 then
        jumping = false
        jumpT = 0
        jumpSoundPlayed = false
        playerY = 0
        return
    end
    playerY = y
end

