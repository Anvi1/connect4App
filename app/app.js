// Main controller starts from here

angular.module('connectFour', [])

.controller('mainController', ['$rootScope', '$scope', '$timeout', function($rootScope, $scope, $timeout) {

    //vm stands for virtual model
    var vm = this;
    
    // 'r' stands for Red color player and 'y' stands for Yellow color player
    var players = ['r', 'y'];

    // randomly selecting first player 
    $scope.chooseFirstPlayer = function(){
        vm.active = players[Math.floor(Math.random() * players.length)];
        vm.dropAllowed = true;
        $scope.firstPlayer = false;
    }

    vm.init = function() {  
        vm.boardState = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        $scope.firstPlayer = true;
        vm.dropAllowed = false;
        vm.winner = false;
        vm.active = null;

    };
    vm.init();


    vm.winDetect = function() {
        var tempWinner = false;
        //horizontal
        for (var i = 0; i < vm.boardState.length; i++) {
            var rowMatch = vm.boardState[i].join('').match(/r{4}|y{4}/);
            if (rowMatch) {
                rowMatch[0].indexOf("r") > -1 ? tempWinner = "red" : tempWinner = "yellow";
            }
        }
        //vertical
        var columns = vm.getColumns();
        for (var j = 0; j < columns.length; j++) {
            var colMatch = columns[j].join('').match(/r{4}|y{4}/);
            if (colMatch) {
                colMatch[0].indexOf("r") > -1 ? tempWinner = "red" : tempWinner = "yellow";
            }
        }
        //diagonal
        var diags = vm.getDiags();
        for (var l = 0; l < diags.length; l++) {
            var diagMatch = diags[l].join('').match(/r{4}|y{4}/);
            if (diagMatch) {
                diagMatch[0].indexOf("r") > -1 ? tempWinner = "red" : tempWinner = "yellow";
            }
        }
        return tempWinner;
    };

    vm.getColumns = function(){
        var columns = [];
        for (var j = 0; j < vm.boardState[0].length; j++) {
            var column = [];
            for (var k = 0; k < vm.boardState.length; k++) {
                column.push(vm.boardState[k][j]);
            }
            columns.push(column);
        }
        return columns;
    };

    vm.getDiags = function(arr) {
        if (typeof arr === 'undefined') arr = vm.boardState;
        var diags = [];
        for (var i = -5; i < 7; i++) {
            var group = [];
            for (var j = 0; j < 6; j++) {
                if ((i + j) >= 0 && (i + j) < 7) {
                    group.push(arr[j][i + j]);
                }
            }
            diags.push(group);
        }
        for (i = 0; i < 12; i++) {
            var group = [];
            for (var j = 5; j >= 0; j--) {
                if ((i - j) >= 0 && (i - j) < 7) {
                    group.push(arr[j][i - j]);
                }
            }
            diags.push(group);
        }
        return diags.filter(function(a) {
            return a.length > 3;
        });
    };

    var detectWin = function(){
        vm.dropAllowed = true;
        vm.winner = vm.winDetect();
        if (vm.winner) {
            vm.dropAllowed = false;
        }
    }

    vm.drop = function(index, index2) {

        if(index === 5 && vm.boardState[index][index2] !== 0 && vm.active == vm.boardState[index][index2]){
            vm.dropAllowed = false;
            vm.boardState[index][index2] = 0;

            //recursive timeout loop for popping object
            (function dropLoop1(i) {
                $timeout(function() {
                    if (typeof vm.boardState[i] !== 'undefined' && vm.boardState[i][index2] === 0 && i > 0) {
                        var prevPlayer = vm.boardState[i - 1][index2];
                        vm.boardState[i - 1][index2] = 0;
                        vm.boardState[i][index2] = prevPlayer;
                        dropLoop1(i - 1);
                    } else {
                        detectWin();
                    }
                }, 50);
            })(5);
        }
        else{
            if(vm.dropAllowed && vm.boardState[index][index2] === 0) {
            vm.dropAllowed = false;
            vm.boardState[0][index2] = vm.active;

            //recursive timeout loop for pushing object
            (function dropLoop(i) {
                $timeout(function() {
                    if (typeof vm.boardState[i] !== 'undefined' && vm.boardState[i][index2] === 0 && i <= 5) {
                        vm.boardState[i - 1][index2] = 0;
                        vm.boardState[i][index2] = vm.active;
                        dropLoop(i + 1);
                    } else {
                        vm.active = (vm.active == 'r' ? 'y' : 'r');
                        detectWin();
                    }
                }, 50);
            })(1);
            }
        }
    };

}]);

