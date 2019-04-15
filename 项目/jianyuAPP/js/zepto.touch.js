（function（$）{
    var touch = {}，
        touchTimeout，tapTimeout，swipeTimeout，longTapTimeout，
        longTapDelay = 750，
        手势，
        向下，向上，移动，
        eventMap，
        initialized = false

    function swipeDirection（x1，x2，y1，y2）{
        返回 数学。abs（x1 - x2）> =
        数学。abs（y1 - y2）？（x1 - x2 > 0  ？ '左' ： '右'）: (y1 - y2 > 0  ？ '向上' ： '向下'）
    }

    function longTap（）{
        longTapTimeout = null
        如果（触摸。最后一个）{
            触摸。el。触发器（' longTap '）
            touch = {}
        }
    }

    function cancelLongTap（）{
        if（longTapTimeout）clearTimeout（longTapTimeout）
        longTapTimeout = null
    }

    function cancelAll（）{
        if（touchTimeout）clearTimeout（touchTimeout）
        if（tapTimeout）clearTimeout（tapTimeout）
        if（swipeTimeout）clearTimeout（swipeTimeout）
        if（longTapTimeout）clearTimeout（longTapTimeout）
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
        touch = {}
    }

    function isPrimaryTouch（event）{
        返程（事件。pointerType == '触摸' ||
            事件。pointerType == event。MSPOINTER_TYPE_TOUCH）
        && 事件。值isPrimary
    }

    function isPointerEventType（e，type）{
        return （例如，类型 == '指针' + 类型 ||
            e。类型。toLowerCase（）== ' mspointer ' + type）
    }

    //用于测试的辅助函数，因此它们检查不同的API
    function unregisterTouchEvents（）{
        if（！ initialized）返回
        $（文件）。关闭（eventMap。向下，向下）
        。关（eventMap。起来，向上）
        。off（eventMap。移动，移动）
        。off（eventMap。取消，取消所有）
        $（窗口）。off（' scroll '，cancelAll）
        cancelAll（）
        initialized = false
    }

    功能 设置（__eventMap）{
        var now，delta，deltaX = 0，deltaY = 0，firstTouch，_isPointerType

        unregisterTouchEvents（）

        eventMap =（__eventMap &&（'向下' 在 __eventMap）） ？__eventMap ：
        （' ontouchstart ' 的 文件 ？
        {
            ' down '： ' touchstart '，' up '： ' touchend '，
            ' move '： ' touchmove '， '取消'： ' touchcancel '
        } ：
        “ onpointerdown ” 的 文件 ？
        {
            ' down '： ' pointerdown '，' up '： ' pointerup '，
            ' move '： ' pointermove '， ' cancel '： ' pointercancel '
        } ：
        “ onmspointerdown ” 的 文件 ？
        {
            ' down '： ' MSPointerDown '，' up '： ' MSPointerUp '，
            ' move '： ' MSPointerMove '， '取消'： ' MSPointerCancel '
        } ： false）

        //没有API可用于触摸事件
        if（！ eventMap）返回

        if（' MSGesture ' 在 窗口中）{
            gesture = new MSGesture（）
            手势。target = 文件。身体

            $（文件）
            。bind（' MSGestureEnd '，function（e）{
                var swipeDirectionFromVelocity =
                    e。velocityX  > 1  ？ '对' ： e。velocityX < - 1  ？ '左' ： e。速度Y > 1  ？ '向下' ： e。velocityY < - 1  ？ ' Up ' ： null
                if（swipeDirectionFromVelocity）{
                    触摸。el。触发（'滑动'）
                    触摸。el。触发器（' swipe ' + swipeDirectionFromVelocity）
                }
            } ）
        }

        down = function（e）{
            if（（_isPointerType = isPointerEventType（e，' down '））&&
            ！isPrimaryTouch（e））返回
            firstTouch = _isPointerType ？e ： e。接触[0]
            如果（Ë。触及 && Ë。触摸。长度 === 1 && 触摸。X2）{
                //如果我们有触摸移动数据，请清除它们
                //如果touchcancel因为preventDefault等而没有触发，就会发生这种情况。
                触摸。x2 = 未定义
                触摸。y2 = 未定义
            }
            现在 = 日期。现在（）
            三角洲 = 现在 - （触摸。最后 || 现在）
            触摸。EL = $（'标签名' 在 firstTouch。目标 ？
            firstTouch。target  ： firstTouch。目标。parentNode）
            touchTimeout && clearTimeout（touchTimeout）
            触摸。x1 = firstTouch。pageX属性
            触摸。y1 = firstTouch。pageY
            if（delta > 0 && delta <= 250）touch。isDoubleTap = true
            触摸。last = now
            longTapTimeout = setTimeout（longTap，longTapDelay）
            //为IE手势识别添加当前触摸接触
            if（gesture && _isPointerType）手势。addPointer（Ë。pointerId）
        }

        move = function（e）{
            if（（_isPointerType = isPointerEventType（e，' move '））&&
            ！isPrimaryTouch（e））返回
            firstTouch = _isPointerType ？e ： e。接触[0]
            cancelLongTap（）
            触摸。x2 = firstTouch。pageX属性
            触摸。y2 = firstTouch。pageY

            deltaX + =  数学。ABS（触摸。X1 - 触摸。X2）
            deltaY + =  数学。ABS（触摸。Y1 - 触摸。Y2）
        }

        up = function（e）{
            if（（_isPointerType = isPointerEventType（e，' up '））&&
            ！isPrimaryTouch（e））返回
            cancelLongTap（）

            //轻扫
            如果（（触摸。X2 && 数学。ABS（触摸。X1 - 触摸。X2）> 30）||
            （触摸。Y2 && 数学。ABS（触摸。Y1 - 触摸。Y2）> 30））

            swipeTimeout = setTimeout（function（）{
                如果（触摸。EL）{
                    触摸。el。触发（'滑动'）
                    触摸。el。触发器（'滑动' +（swipeDirection（触摸。X1，触摸。X2，触摸。Y1，触摸。Y2）））
                }
                touch = {}
            } ，0）

            //正常点击
            否则 ，如果（“最后” 的触摸）
            //当delta位置变化超过30像素时，不要点击，
            //例如，当移动到一个点并返回原点时
            if（deltaX < 30 && deltaY < 30）{
                //延迟一个刻度线，这样我们可以在'滚动'触发时取消'点击'事件
                //（'tap'在'scroll'之前触发）
                tapTimeout = setTimeout（function（）{

                    //使用cancelTouch（）选项触发通用'tap'
                    //（cancelTouch取消单个与双击的处理，以获得更快的“敲击”响应）
                    var event = $。活动（'点击'）
                    事件。cancelTouch = cancelAll
                    // [通过纸张]修复 - >“TypeError：'undefined'不是对象（评估'touch.el.trigger'），双击
                    如果（触摸。EL）的触摸。el。触发器（事件）

                    //立即触发双击
                    如果（触摸。isDoubleTap）{
                        如果（触摸。EL）的触摸。el。触发器（' doubleTap '）
                        touch = {}
                    }

                    //在250ms不活动后触发单击
                    其他 {
                        touchTimeout = setTimeout（function（）{
                            touchTimeout = null
                            如果（触摸。EL）的触摸。el。触发器（' singleTap '）
                            touch = {}
                        } ，250）
                    }
                } ，0）
            } else {
                touch = {}
            }
            deltaX = deltaY = 0
        }

        $（文件）。上（eventMap。起来，起来）
        。on（eventMap。向下，向下）
        。on（eventMap。移动，移动）

        //当浏览器窗口失去焦点时
        //例如，当显示模态对话框时，
        //取消所有正在进行的活动
        $（文件）。on（eventMap。取消，取消所有）

        //滚动窗口表示用户的意图
        //滚动，不点按或滑动，因此取消所有正在进行的活动
        $（窗口）。on（' scroll '，cancelAll）

        initialized = true
    }

    ;[' swipe '，' swipeLeft '，' swipeRight '，' swipeUp '，' swipeDown '，
        ' doubleTap '， ' tap '， ' singleTap '， ' longTap ']。forEach（ function（ eventName）{
        $。fn[eventName] = function（callback）{ return this。on（eventName，callback） }
    } ）

    $。touch = { setup ： setup }

    $（文件）。准备好（设置）
} ）