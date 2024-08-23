/* eslint-disable no-undef */
//index1はasyncにしてloadにするのが一番早い
//DOMContentLoadedはayncをキャッチできない場合がある
$("div#1000").html(_.capitalize("hello"));
