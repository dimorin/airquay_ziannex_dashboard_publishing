var _value = [

    // 배열 0 = 표시값, 배열 1 = 최대값

    // 1구간 테이블 데이터
    ['75','100','1,700','4,200'],           // section1 굴진현황
    ['16','5'],                             // section2 출역현황
    ['21','5','12','25'],                   // section3 환경현황

    // 2구간 테이블 데이터
    ['75','100','1,700','4,200'],           // section4 굴진현황
    ['16','5'],                             // section5 출역현황
    ['21','5','12','25'],                   // section6 환경현황

    // 터널 진행 상황도
    ['32','6','7','8','9'],                 // section7 현장 작업자
    ['10','3','2','2','3'],                 // section8 현장 중장비
    ['75','100'],                           // section9 전체 굴착 진행율 그래프
    ['2,345','4,855'],                      // section10 전체 굴착 진행 거리

    // 터널 그래프 데이터
    ['45','100','6','3','7','2'],               // section11 터널1 데이터
    ['72','100','8','2','9','3'],               // section12 터널2 데이터
]

$(function () {
    InitFn()
    setTime()
    setDate()
})

/* 초기 호출 */
function InitFn() {

    /* 클래스 체크후 해당 함수 순차 호출 */
    var i = 1
    var id = setInterval(function () {
        var _class = $('#section' + i).attr('class').split(' ')
        $('#section' + i).addClass('on')
            if (_class[1] == "rate") rateFn($('#section' + i), i - 1)
            else if (_class[1] == "circle") circleFn($('#section' + i), i - 1)
            else if (_class[1] == "count") countFn($('#section' + i), i - 1)
            else if (_class[1] == "rate2") rate2Fn($('#section' + i), i - 1)
            i++
            if (i == 13) clearInterval(id)
    }, 100)
}


/* Bar, count Graph Function */
function rateFn(_obj, _idx, _speed) {
    var _speed = _speed || 800;
    if(_obj.find('.counter').attr('data-value') != _value[_idx]){
        _obj.find('.counter').attr('data-value', _value[_idx])
        _obj.find('.score').attr('data-value', _value[_idx][0]).counterUp({ time: _speed })
        _obj.find('.score1').attr('data-value', _value[_idx][2]).counterUp({ time: _speed })
        _obj.find('.score2').attr('data-value', _value[_idx][3]).counterUp({ time: _speed })
        _obj.find('.score3').attr('data-value', parseFloat(_value[_idx][1] - _value[_idx][0])).counterUp({ time: _speed })
        _obj.find('.score4').attr('data-value', _value[_idx][4]).counterUp({ time: _speed })
        _obj.find('.score5').attr('data-value', _value[_idx][5]).counterUp({ time: _speed })
        _obj.find('.bar > span').css('width', parseFloat(100 / _value[_idx][1] * _value[_idx][0]) + "%")
        _obj.find('.counter').counterUp({ time: _speed });
    }
}

function countFn(_obj, _idx, _speed) {
    var _speed = _speed || 800;
    if(_obj.find('.counter').attr('data-value') != _value[_idx]){
        _obj.find('.score').attr('data-value', _value[_idx][0]).counterUp({ time: _speed })
        _obj.find('.score1').attr('data-value', _value[_idx][1]).counterUp({ time: _speed })
        _obj.find('.score2').attr('data-value', _value[_idx][2]).counterUp({ time: _speed })
        _obj.find('.score3').attr('data-value', _value[_idx][3]).counterUp({ time: _speed })
        _obj.find('.score4').attr('data-value', _value[_idx][4]).counterUp({ time: _speed })
        _obj.find('.counter').counterUp({ time: _speed });
    }
}


/* Circle Graph Function */
function circleFn(_obj, _idx, _speed) {
    var _speed = _speed || 800;
        _obj.find('.graph').attr('data-value', (1 / _value[_idx][1] * _value[_idx][0]))
        _obj.find('.score').attr('data-value', _value[_idx][0]).counterUp({ time: _speed })

            _obj.find('.graph').circleProgress({
                startAngle: -Math.PI / 4 * -90,
                lineCap: 'round',
                animation: {
                    duration: _speed+100
                }
            });
        }




/* 3D 터널 드래그 및 확대 축소 스크립트 */
/*
        document.addEventListener('DOMContentLoaded', function () {
            const ele = document.getElementById('container');
            ele.style.cursor = 'grab';
        
            let pos = { top: 0, left: 0, x: 0, y: 0 };
        
            const mouseDownHandler = function (e) {
                ele.style.cursor = 'grabbing';
                ele.style.userSelect = 'none';
                pos = {
                    left: ele.scrollLeft,
                    top: ele.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                };
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };
        
            const mouseMoveHandler = function (e) {
                // How far the mouse has been moved
                const dx = e.clientX - pos.x;
                const dy = e.clientY - pos.y;
        
                // Scroll the element
                ele.scrollTop = pos.top - dy;
                if(ele.scrollTop == 3792){
                    ele.scrollTop = 3788
                }
                ele.scrollLeft = pos.left - dx;
            };
        
            const mouseUpHandler = function () {
                ele.style.cursor = 'grab';
                ele.style.removeProperty('user-select');
        
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };
        
            // Attach the handler
            ele.addEventListener('mousedown', mouseDownHandler);
        });
        
        
            // Turnnel Zoom
            var zoomrate=1
            
            function ZoomIn() { if (zoomrate < 1.8) { zoomrate = zoomrate + 0.1 } turnnel_box.style.cssText = "transform: scale( " + zoomrate +" );" }
            function ZoomFit(){ zoomrate=1; turnnel_box.style.cssText = "transform: scale(1);" }
            function ZoomOut(){ if (zoomrate > 0.7) { zoomrate = zoomrate - 0.1; } turnnel_box.style.cssText = "transform: scale( " + zoomrate +" );" }

*/

function setTime(){
    const time = document.getElementById('current-time'); // id가 'current-time'인 요소
    // 1초마다 현재 시각 업데이트
    setInterval(() => {

        var today = new Date();   
        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 
        var timeString = hours + ':' + minutes  + ':' + seconds;
        time.innerHTML = timeString;
    }, 1000);
}

function setDate(){
    const date = document.getElementById('current-date'); // id가 'current-time'인 요소

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '.' + month  + '.' + day + ' | ';

    date.innerHTML = dateString;
}


function soundSwitch() {
    let sound = document.querySelector(".sound");
    sound.classList.toggle("active");
}


function openPop() {
    let r_pop = document.querySelector(".release_pop");
    r_pop.classList.toggle("active");
}

function openAlarm() {
    let a_pop = document.querySelector(".alarm_pop");
    a_pop.classList.toggle("active");
}