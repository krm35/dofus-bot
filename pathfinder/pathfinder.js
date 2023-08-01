module.exports.buildGraph = function buildGraph(graph, cells, diagonal) {
    let id = 0;
    for (let line = 1; line <= 40; line++) {
        for (let column = 1; column <= 14; column++) {
            const pair = (line - 1) % 2 === 0;
            if (cells[id]?.mov) {
                (pair ? [13, 14] : [14, 15]).forEach((value, i) => {
                    if (i && !pair && column === 14) return;
                    if (!i && pair && column === 1) return;
                    if (cells[id + value]?.mov) {
                        graph.addEdge(id, id + value, 1);
                        graph.addEdge(id + value, id, 1);
                    }
                });
                if (diagonal) {
                    [1, 28].forEach((value, i) => {
                        if (!i && column === 14) return;
                        if (cells[id + value]?.mov) {
                            graph.addEdge(id, id + value, 1);
                            graph.addEdge(id + value, id, 1);
                        }
                    });
                }
            }
            id++;
        }
    }
};

module.exports.shortestPaths = function shortestPaths(graph, source, destination) {
    let path = graph.shortestPath(source, destination);
    const paths = [path], removedEdges = [], weight = path.weight;
    while (weight) {
        graph.removeEdge(path[0] * 1, path[1] * 1);
        graph.removeEdge(path[1] * 1, path[0] * 1);
        removedEdges.push([path[0] * 1, path[1] * 1]);
        path = graph.shortestPath(source, destination);
        if (weight < path.weight) break;
        paths.push(path);
    }
    for (const [u, v] of removedEdges) {
        graph.addEdge(u, v);
        graph.addEdge(v, u);
    }
    return paths;
};

module.exports.getServerMovement = function getServerMovement(path) {
    const _aPath = [];
    for (let i = 0; i < path.length; i++) path[i] = {cellId: path[i] * 1};
    for (let i = 0; i < path.length; i++) {
        _aPath.push({
            cellId: path[i],
            step: path[i + 1],
            orientation: calculateDirection(path[i].cellId, path[i + 1]?.cellId ?? 0)
        });
    }
    let lastValue;
    let value = 0;
    const end = _aPath[_aPath.length - 1];
    compress(_aPath);
    const movement = [];
    let lastOrientation = 0;
    let moveCount = 0;
    for (let i = 0; i < _aPath.length - 1; i++) {
        const pe = _aPath[i];
        if (!pe) continue;
        lastOrientation = pe.orientation;
        value = (lastOrientation & 7) << 12 | pe.cellId.cellId & 4095;
        movement.push(value);
        moveCount++;
    }
    lastValue = (lastOrientation & 7) << 12 | end.cellId.cellId & 4095;
    movement.push(lastValue);
    return movement;
};

function compress(path) {
    let elem = 0;
    if (path.length > 0) {
        elem = path.length - 1;
        while (elem > 0) {
            if (path[elem].orientation === path[elem - 1].orientation) {
                delete path[elem];
                elem--;
            } else {
                elem--;
            }
        }
    }
    return path;
}

function calculateDirection(c1, c2) {
    const diff = c2 - c1;
    if (diff === 1) return 0; // EAST;
    if (diff === 28) return 2; // SOUTH;
    if (diff === -1) return 4; // WEST;
    if (diff === -28) return 6; // NORTH;
    return getLookDirection8Exact(c1, c2)
}

function getLookDirection8Exact(param1, param2) {
    let _loc3_ = Math.floor(param1 / 14);
    let _loc4_ = Math.floor((_loc3_ + 1) / 2);
    let _loc5_ = param1 - _loc3_ * 14;
    let _loc6_ = Math.floor(param1 / 14);
    let _loc7_ = Math.floor((_loc6_ + 1) / 2);
    let _loc8_ = _loc6_ - _loc7_;
    let _loc9_ = param1 - _loc6_ * 14;
    let _loc10_ = Math.floor(param2 / 14);
    let _loc11_ = Math.floor((_loc10_ + 1) / 2);
    let _loc12_ = param2 - _loc10_ * 14;
    let _loc13_ = Math.floor(param2 / 14);
    let _loc14_ = Math.floor((_loc13_ + 1) / 2);
    let _loc15_ = _loc13_ - _loc14_;
    let _loc16_ = param2 - _loc13_ * 14;
    return getLookDirection4ExactByCoord(_loc4_ + _loc5_, _loc9_ - _loc8_, _loc11_ + _loc12_, _loc16_ - _loc15_);
}

function getLookDirection4ExactByCoord(param1, param2, param3, param4) {
    let _loc5_ = param3 - param1;
    let _loc6_ = param4 - param2;
    if (_loc6_ === 0) {
        if (_loc5_ < 0) {
            return 5; // NORTH_WEST;
        }
        return 1; // SOUTH_EAST;
    }
    if (_loc5_ === 0) {
        if (_loc6_ < 0) {
            return 3; // SOUTH_WEST;
        }
        return 7; // NORTH_EAST;
    }
    return -1;
}
