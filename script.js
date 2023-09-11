$(document).ready(function () {
    let timer1;
    let time
    function timer() {
        $('.timer').text('01 : 00')
        let min = '00'
        let sec = 60
        timer1 = setInterval(() => {
            if (sec == 0) {
                $('.td-1').addClass('disabled')
                document.querySelector('#check').disabled = true
                document.querySelector('#new').disabled = false
                $('.check-menu').show()
                $('.pity').show()
                $('.time-less').hide()
                $('.result').hide()
                clearInterval(timer1)
            }
            if (sec > 0) {
                sec--;
                if (sec < 10) {
                    sec = '0' + sec
                }

            }
            $('.timer').text(`${min} : ${sec}`)
            time = $('.timer').text()
            $('.time-less-p').html(`You still have time, you sure? ${time}`)

        }, 1000);

    }

    $('#check').click(function () {
        $('.time-less').show()
        document.querySelector('#new').disabled = true
        document.querySelector('#check').disabled = true
        document.querySelector('#start').disabled = true
        $('.check-menu').show()
    })

    $('#closeBut').click(function () {
        $('.time-less').hide()
        $('.check-menu').hide()

        document.querySelector('#check').disabled = false
    })

    $('#closeResult').click(function () {
        $('.result').hide()
        $('.check-menu').hide()
        document.querySelector('#new').disabled = false
    })

    $('#check-check').click(function () {
        $('.time-less').hide()
        $('.result').show()
        for (let i = 0; i < $('.col').length; i++) {
            if ($('.col').eq(i).html() != `<div class="td-1 ui-sortable-handle disabled" id="foto-${i + 1}" style="position: absolute;"></div>`) {
                $('.result-p').html(`It's a pity, but you lost`)
                break;
            }
            else {
                $('.result-p').html(`Woohoo, well done, you did it!`)
            }
        }

        document.querySelector('#new').disabled = true
        document.querySelector('#start').disabled = true
        clearInterval(timer1)
        document.querySelector('#check').disabled = true
    })

    function random() {
        let check = []
        let min = 1;
        let max = 16;
        for (let j = 0; j < $("tr td").length; j++) {
            let test
            for (let i = 0; i < 10; i++) {
                test = Math.floor(Math.random() * (max - min + 1)) + min;
                check.push(test)
            }
            for (let i = 0; i < check.length; i++) {
                function unique(arr) {
                    let result = [];

                    for (let str of arr) {
                        if (!result.includes(str)) {
                            result.push(str);
                        }
                    }
                    check = result
                    return result;
                }
            }
            unique(check)

            if ($(`tr td`).eq(j).html() != undefined) {
                $(`tr td`).eq(j).html(`<div class="td-1 ui-sortable-handle" id="foto-${check[j]}"></div>`)
            }
        }


    }



    $('#start').click(function () {
        $('.sort').sortable({
            connectWith: 'tr, .col',
            cancel: '.disabled',
            distance: 100,
            update: function (event, ui) { }
        })


        $(".sort").on("sortupdate", function (event, ui) {
            let test = ui.item[0]
            test.classList.add('disabled')
            test.style.position = 'absolute'
            if (test.parentNode.children.length == 2) {
                test.classList.remove('disabled')
                test.style.zIndex = '2'

                $('.alert').show()
                $('#close').click(function () {
                    $('.alert').hide()
                    test.style.borderColor = 'none'
                })
            }
        })
        document.querySelector('#check').disabled = false
        document.querySelector('#new').disabled = false
        document.querySelector('#start').disabled = true


        timer()
        random()

    })



    $('#close-pity').click(function () {
        $('.check-menu').hide()
        $('.pity').hide()
    })

    $('#new').click(function () {
        document.querySelector('#check').disabled = true
        document.querySelector('#new').disabled = true
        document.querySelector('#start').disabled = false
        random()
        for (let i = 0; i < $('.col').length; i++) {
            $('.col').eq(i).html('')
        }
        $('.timer').text('01 : 00')
    })


})