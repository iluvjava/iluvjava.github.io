/**
 * This class represents a 2d array.
 */
class My2DArray {
  constructor(i, j) {
    if (i <= 0 || j <= 0)
      throw new Error("My2DArray must be larger than zero. ");
    this._Arr = new Array(i * j);
    this.I = i;
    this.J = j;
  }

  /**
   * get element of the array at that position, ondex beyond the
   * - length of the element will loop back to the beginning
   * - negative numbers will loop back from the back.
   * @param {*} x
   * @param {*} y
   */
  get(x, y) {
    let l = this._remapIndex(x, y);
    return this._Arr[l[0] * this.I + l[1]];
  }

  /**
   * This function remaps indices that are invalid to the size of the
   * matrix.
   * @param {*} x
   * @param {*} y
   */
  _remapIndex(x, y) {
    if (x < 0 || y < 0) {
      if (x < 0) {
        x = -x;
      }
      y = -y;
    }

    if (x >= this.I || y >= this.J) {
      if (x >= this.I) {
        x %= this.I;
      }
      y %= this.J;
    }
    return [x, y];
  }

  /**
   * -
   * - length of the element will loop back to the beginning
   * - negative numbers will loop back from the back.
   * @param {*} x
   * @param {*} y
   * @param {*} val
   */
  set(x, y, val) {
    let l = this._remapIndex(x, y);
    this._Arr[l[0] * this.I + l[1]] = val;
  }

  getHeight() {
    return this.J;
  }

  getWidth() {
    return this.I;
  }
  /**
   * Return an instance of My2DArray where each entry is either a 1 or a 0.
   * @returns {My2DArray}
   * 
   */
  static getRandomBool2DArray(x, y) {
    let res = new My2DArray(x, y);
    for (let i = 0; i < x; i++)
      for (let j = 0; j < y; j++) {
        res.set(i, j, Math.floor(Math.random() * 2));
      }
    return res;
  }

}

/**
 * It models the game of life.
 */
class GameOfLifeLogic {

  /**
   * Pass in a 2d array to for the model of the game.
   * @param {My2DArray} array
   */
  constructor(array) {
    this.CurrentFrame = array; // The current frame we are looking at.
    this._H = array.getWidth();
    this._W = array.getHeight();
  }

  /**
   * The height of the size of the canvas
   */
  getHeight() {
    return this.CurrentFrame.getHeight();
  }

  /**
   * The width of the model.
   */
  getWidth() {
    return this.CurrentFrame.getWidth();
  }

  /**
   * Return the number of neighbor that is alive in a certain position.
   * * Counts the numbers of alive at that surrounded the grid at
   * * that position.
   */
  alive_count(x, y) {
    let res = 0;
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0)
          continue;
        res += this.CurrentFrame.get(x + i, y + j);
      }
    return res;
  }

  /**
   * This function return a bool to indicated if the block at
   * that position should be updated.
   *
   */
  should_live(posi1, posi2) {
    let alivecount = this.alive_count(posi1, posi2);
    if (this.CurrentFrame.get(posi1, posi2)) {
      if (alivecount <= 3) {
        if (alivecount < 2) return false;
        return true;
      }
      return false;
    }
    return alivecount === 3;
  }

  /**
   * This function push the frames of the game model in the list. It does the
   * following things:
   * * 1. Render then pushes frames into the tensor.
   * * 2. All the frames are in reverse order.
   *
   * @param {Integer} frames
   * @returns {Array}
   * An array of my2darray containing all the rendered frames.
   */
  update(frames = 1) {
    this._updateOneFrame();
    return [this.CurrentFrame];
  }

  /**
   * retrive the most recent matrix and then update the matrix.
   *  * it will pushes the new frame into the current model array.
   *  * it will refer the current frame to the newly rendered frame.
   */
  _updateOneFrame() {
    let newframe = new My2DArray(this._H, this._W);
    for (let i = 0; i < this._W; i++)
      for (let j = 0; j < this._H; j++) {
        newframe.set(i, j, this.should_live(i, j));
      }
    this.CurrentFrame = newframe;

  }
}
/**
 * This class provides an in place algorithm for the evolution 
 * of the array. 
 */
class GameOfLifeLogic2 {
  /**
   * 
   * @param {My2DArray} arr
   * An instance of My2DArray.  
   */
  constructor(arr) {
    this.Arr = arr;
    this.W = arr.getWidth();
    this.H = arr.getHeight();
  }


  /**
   * Return the number of neighbor that is alive in a certain position.
   * * Counts the numbers of alive at that surrounded the grid at
   * * that position.
   */
  alive_count(x, y) {
    let res = 0;
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0)
          continue;
        res += ~~(this.Arr.get(x + i, y + j));
      }
    return res;
  }

  /**
   * Methods updates the current 2D array and return it inside an array. 
   * @return {Array} 
   * a reference to the next generation.
   */
  update() {
    this.MarkAndGenerateNextGen();
    return [this.Arr];
  }

  /**
   * Marking on the board with float for the next generation. 
   * if it's dead to alive, then it's set to 0.5, 
   * if it's alive to dead, it's set to 1.5,
   * alive stays alive, it's still 1
   * dead stays dead, it's still 0
   * - This is generated Inplace! 
   */
  MarkAndGenerateNextGen() {
    for (let i = 0; i < this.W; i++)
      for (let j = 0; j < this.H; j++) {
        let v = this.Arr.get(i, j);
        let ShouldLive = this.should_live(i, j);
        if (v === 1 && ShouldLive) continue;
        if (v === 0 && !ShouldLive) continue;
        this.Arr.set(i, j, v + 0.5);
      }
    for (let i = 0; i < this.W; i++)
      for (let j = 0; j < this.H; j++) {
        if (this.Arr.get(i, j) === 0.5) this.Arr.set(i, j, 1);
        if (this.Arr.get(i, j) === 1.5) this.Arr.set(i, j, 0);
      }
  }

  /**
   * 
   * @param {int} posi1 
   * @param {in} posi2
   * @return {boolean}
   * true if the cell is going to leave for the next generation. 
   */
  should_live(posi1, posi2) {
    let alivecount = this.alive_count(posi1, posi2);
    if (this.Arr.get(posi1, posi2)) {
      if (alivecount <= 3) {
        if (alivecount < 2) return false;
        return true;
      }
      return false;
    }
    return alivecount === 3;
  }


}