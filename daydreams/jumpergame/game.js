function resetGame() {
    for(let i = 0; i < POPULATION; i++) {
        players.push(new Player())
    }
    alivePlayers = players
    obstacles = []
    obstacles.push(new Obstacle())
}
function getBestScore() {
    let top = alivePlayers.sort((a, b) => b.score-a.score)
    return top[0].score

}