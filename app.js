document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = [];
    let score = 0;
    const candyColors = [
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)'
      ]

    //CREATE BOARD
    function createBoard (){
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random()*candyColors.length);
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)

        }
    }
    createBoard()

    //DRAG THE CANDIES
    let colorBeingDragged;
    let colorBeingReplaced;
    let sqaureIdBeingDragged;
    let sqaureIdBeingReplaced
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundImage;
        sqaureIdBeingDragged = parseInt(this.id)
        
    }
    function dragEnd(){
        
        let validMoves = [
            sqaureIdBeingDragged -1,
            sqaureIdBeingDragged -width,
            sqaureIdBeingDragged +1,
            sqaureIdBeingDragged +width
        ]
        let validMove = validMoves.includes(sqaureIdBeingReplaced)
        if(sqaureIdBeingReplaced && validMove){
            sqaureIdBeingReplaced = null;
        }
        else if(sqaureIdBeingReplaced && !validMove){
            squares[sqaureIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[sqaureIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
        else squares[sqaureIdBeingDragged].style.backgroundImage = colorBeingDragged
    }

    function dragEnter(e){
        e.preventDefault()
       
    }
    function dragOver(e){
        e.preventDefault()
        
    }
    function dragLeave(){
        
    }
    function dragDrop(){
        colorBeingReplaced = this.style.backgroundImage;
        sqaureIdBeingReplaced= parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        
        squares[sqaureIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    // CHECKING FOR MATCHES
    // CHECK FOR ROW THREE

    function checkRowForThree(){
        for (i = 0; i<61; i++){
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage;
            let notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
            if(notValid.includes(i)) continue
            const isBlank = squares[i].style.backgroundImage ===''
            if(rowOfThree.every(index=>squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage=''
                })

            }
        }
    }
    // CHECK FOR COLUMN THREE

    function checkColumnForThree(){
        for (i = 0; i<47; i++){
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage ===''
            if(columnOfThree.every(index=>squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage=''
                })

            }
        }
    }
     // CHECK FOR ROW FOUR

     function checkRowForFour(){
        for (i = 0; i<60; i++){
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage;
            let notValid = [5,6,7, 13,14,15, 21, 22,23, 29, 30,31, 37, 38,39, 45, 46,47, 53, 54,55];
            if(notValid.includes(i)) continue
            const isBlank = squares[i].style.backgroundImage ===''
            if(rowOfFour.every(index=>squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage=''
                })

            }
        }
    }
    // CHECK FOR COLUMN FOUR

    function checkColumnForFour(){
        for (i = 0; i<47; i++){
            let columnOfFour = [i, i+width, i+width*2, i+width*3 ]
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage ===''
            if(columnOfFour.every(index=>squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage=''
                })

            }
        }
    }
    moveDown()
checkRowForFour()
checkColumnForFour()
checkRowForThree()
checkColumnForThree()
window.setInterval(function(){
    moveDown()
    checkRowForFour()
checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
},100)

//DROP MORE CANDIES ONCE THERE IS A MATCH

function moveDown(){

    for(i= 0; i<55; i++){
        if(squares[i+width].style.backgroundImage ===''){
            squares[i+width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage ='';
        }
        const firstRow =[0,1,2,3,4,5,6,7];
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && (squares[i].style.backgroundImage === '')){
                // squares[i].style.backgroundImage = "grey"
                // console.log(squares[i])
                let randomColor = Math.floor(Math.random()*candyColors.length);
            squares[i].style.backgroundImage = candyColors[randomColor]
            }

    }
}
})