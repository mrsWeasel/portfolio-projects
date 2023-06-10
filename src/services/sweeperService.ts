
export const generateMineGrid = () => {
    // 25 chars - 5 x 5 grid
    // TODO: make dynamic
    // return ("01000 11000 10101 00000 11100")
    return ([
        [0,1,0,0,0],
        [1,1,0,0,0],
        [1,0,1,0,1],
        [0,0,0,0,0],
        [1,1,1,0,0]
    ])
}
