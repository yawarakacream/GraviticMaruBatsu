
const PieceType = {
    NONE: { mark: '_' },
    MARU: { mark: '○', color: 'red' },
    BATSU: { mark: '×', color: 'blue' }
}

class Game {

    constructor(size) {
        this.size = size;
        this.field = new Array(size);
        this.turn = PieceType.MARU;
        this.points = new Map([
            [PieceType.MARU, 0],
            [PieceType.BATSU, 0]
        ]);
        for (let i = 0; i < size; i++)
            this.field[i] = new Array(size).fill(PieceType.NONE);
    }

    getPiece(row, column) {
        return this.field[row][column];
    }

    isEmpty(row, column) {
        return this.getPiece(row, column) === PieceType.NONE;
    }

    /**
     * column 列のうち下から数えて初めてピースが NONE な位置を返す
     */
    getEmptyRow(column) {
        for (let i = 0; i < this.size; i++) {
            if (this.isEmpty(this.size - (i + 1), column))
                return this.size - (i + 1);
        }
        return undefined;
    }

    addPiece(row, column) {
        this.field[row][column] = this.getTurn();
        this.reverseTurn();
        this.calcPoints();
    }

    getTurn() {
        return this.turn;
    }

    reverseTurn() {
        this.turn = this.turn === PieceType.MARU ? PieceType.BATSU : PieceType.MARU;
    }

    getPoint(type) {
        return this.points.get(type);
    }

    setPoint(type, value) {
        this.points.set(type, value);
    }

    calcPoints() {
        this.setPoint(PieceType.MARU, 0);
        this.setPoint(PieceType.BATSU, 0);

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.isEmpty(i, j))
                    continue;

                const p = this.getPiece(i, j);

                if (p === PieceType.NONE)
                    continue;

                const increment = () => this.setPoint(p, this.getPoint(p) + 1);

                const bi = 0 < i && i + 1 < this.size;
                const bj = 0 < j && j + 1 < this.size;

                if (bi && bj) {
                    if (p === this.getPiece(i + 1, j + 1) && p === this.getPiece(i - 1, j - 1))
                        increment();
                    if (p === this.getPiece(i + 1, j - 1) && p === this.getPiece(i - 1, j + 1))
                        increment();
                }
                if (bi) {
                    if (p === this.getPiece(i + 1, j) && p === this.getPiece(i - 1, j))
                        increment();
                }
                if (bj) {
                    if (p === this.getPiece(i, j + 1) && p === this.getPiece(i, j - 1))
                        increment();
                }
            }
        }
    }

};
