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

  /**
   * Return a certain size of 2d array that has all 0s in it. 
   */
  static getZero2DArray(W, H)
  {
    let res = new My2DArray(W, H);
    for (let i = 0; i < W; i++)
      for (let j = 0; j < H; j++) {
        res.set(i,j, 0);
      }
    return res; 
  }

  /**
   * Get a string representation of the object. 
   * @returns {string} 
   * 
   */
  ToString() {
    let res = "";
    for (let i = 0; i < this.I; i++) {
      for (let j = 0; j< this.J; j++)
      {
        res += this.get(i, j).toFixed(1) + "  ";
      }
      res += "\n";
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

/**
 * An attempt on making the second iteration even faster. 
 * - When updating, we only updates alives at time t. 
 * - 1 means current alive, 0 means current die.
 *!-  when updating neighbors. 
 *    - only updates if the cell is alive/is next to an alive neibour. 
 *    - ?.1 => 0 neibours at t (happens when one cell is alone at time t)
 *    - ?.n => n-1 neibours at t. 
 *    - ? is either 1 or 0.
 * - Normalize and update the array. 
 * - Speed Improvements: 
 *  - Inplace and O(N) where N is the number of active cells. 
 * ? Possible further inprovements?
 */
class GameOfLifeLogic3 {

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
   * @returns 
   * Return next generation in [arr]
   */
  update()  
  {
    this.RenderNeighbors();
    this.Normalization();
    return [this.Arr]; 
  }

  /**
   * Render integers into floats to 
   * represent neighbors count. 
   * ! Update the only the living cells and its vicinity. (Active cells )
   */
  RenderNeighbors() {
    for (let i = 0; i < this.W; i++)
      for (let j = 0; j < this.H; j++) {
       // if(i === 3 && j === 3)debugger; // ! bug

        let CellVal = this.Arr.get(i, j);
        if (CellVal !== 1) continue;
        // Update This Alive cell at time t. 
        this.UpdateNeighborsAt(i, j);
        
        // Update the neighbors if it hasn't been updated. 
        for (let m = -1; m < 2; m++)
          for (let n = -1; n < 2; n++) {
            if (m === 0 && n === 0) continue;
            CellVal = this.Arr.get(m + i, n + j);
            if (CellVal === 0) {
              this.UpdateNeighborsAt(m + i, n + j);
            }
          }
      }
  }

  /**
   * Decides weather a cell will live in t + 1 and 
   * normailize all the values. 
   */
  Normalization() {
    for (let i = 0; i < this.W; i++)
      for (let j = 0; j < this.H; j++) {
        let Cellval = this.Arr.get(i, j);
        if (Cellval === 0 || Cellval === 1)
        continue;
        if (this.ShouldLive(i, j))
          this.Arr.set(i, j, 1);
        else
          this.Arr.set(i, j, 0);
      }
  }

  /**
   * 
   * @param {int} x 
   * @param {int} y 
   */
  UpdateNeighborsAt(x, y) {
    let res = 0;
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0)
          continue;
        res += ~~(this.Arr.get(x + i, y + j));
      }
    return this.Arr.set(x, y, this.Arr.get(x, y) + (res + 1) / 10);
  }

  /**
   * For the preprocessed array, it returns the number of neibours it has. 
   * ! A cell is processed only if it "floats", else throw error. 
   */
  CountAlive(x, y) {
    let CellVal = this.Arr.get(x, y);
    if (CellVal === 1 || CellVal === 0) {
      throw new Error();
    }
    return ((CellVal - (~~CellVal)) * 10) - 1;
  }

  /**
   * Analyze the intermediate results, using the rules of the game. 
   * ! Function cannot be called on with where x,y is non floating. 
   * @param {int} x
   * @param {int} y
   * @return {bool}
   * true if live on to next generation. 
   * false it doesn't live onto next generation.  
   */
  ShouldLive(x, y) {
    let alivecount = this.CountAlive(x, y);
    if (this.Arr.get(x, y) > 1) {
      if (alivecount <= 3) {
        if (alivecount < 2) return false;
        return true;
      }
      return false;
    }
    return alivecount === 3;
  }


}

  // Codes for testing and shit. 
  
  let testarray = My2DArray.getZero2DArray(6, 6);
  console.log("Testing with a 6x6 grid with static a life. ");
  testarray.set(2, 2, 1);
  testarray.set(3, 2, 1);
  testarray.set(2, 3, 1);
  testarray.set(3, 3, 1);
  console.log(testarray.ToString());
  let m = new GameOfLifeLogic3(testarray);
  console.log("Trying to render cell blocks: ");
  m.RenderNeighbors();
  console.log(testarray.ToString());
  console.log("Normalizing the rendered cell block: ");
  m.Normalization();
  console.log(testarray.ToString());
  
