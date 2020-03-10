describe("mainController",function(){

    var $rootScope,
        $scope,
        controller;

    beforeEach(function(){
        module('connectFour');
    
    inject(function ($injector){
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        controller = $injector.get('$controller') ("mainController", {$scope: $scope});
    });
});
    
    it("should return value of winner if matched diagonally", function(){
        var boardStateDiag = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            ['y', 0, 0, 'r', 0, 0, 0],
            ['y', 0, 'r', 'y', 0, 0, 0],
            ['y', 'r', 'y', 'r', 0, 0, 0],
            ['r', 'r', 'y', 'y', 0, 0, 0]
        ];
        controller.boardState = boardStateDiag;
        expect(controller.winDetect()).toEqual("red");
    });

    it("should return value of winner if matched column wise", function(){
        var boardStateDiag = [
            [0, 0, 0, 0, 0, 0, 0],
            ['y', 0, 0, 0, 0, 0, 0],
            ['y', 0, 0, 0, 0, 0, 0],
            ['y', 0, 'r', 'y', 0, 0, 0],
            ['y', 'r', 'y', 'r', 0, 0, 0],
            ['r', 'r', 'y', 'y', 0, 0, 0]
        ];
        controller.boardState = boardStateDiag;
        expect(controller.winDetect()).toEqual("yellow");
    });

    it("should return value of winner if matched column wise", function(){
        var boardStateDiag = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            ['y', 0, 0, 0, 0, 0, 0],
            ['y', 'r', 'r', 'r', 'r', 0, 0],
            ['y', 'r', 'y', 'r', 'r', 0, 0],
            ['r', 'r', 'y', 'y', 'y', 0, 0]
        ];
        controller.boardState = boardStateDiag;
        expect(controller.winDetect()).toEqual("red");
    });
    
});