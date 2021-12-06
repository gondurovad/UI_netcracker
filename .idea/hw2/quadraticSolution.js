var countLines = 0;

function equationSolution() {
    var a = document.getElementById('text1').value;
    var b = document.getElementById('text2').value;
    var c = document.getElementById('text3').value;
    var discr, res, areDifferent=false, res2;

    if(!(isNumeric(a)&&isNumeric(b)&&isNumeric(c))) alert("Некорректные данные. Убедитесь, что заполнены все поля и введены числовые значения.");
    else if (parseFloat(a)==0) alert("Данное уравнение не является квадратным! Введите ненулевую старшую степень.");
    else {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);
        discr = b*b-4*a*c;
        if (discr<0) res = "нет действительных корней";
        else if (discr == 0) res=-b/(2*a);
        else {
            areDifferent = true;
            res=(-b-Math.sqrt(discr))/(2*a);
            res2=(-b+Math.sqrt(discr))/(2*a);
        }

        var pNode = document.getElementById('table');
        var newLine = document.createElement('tr');
        var newFirstColumn = document.createElement('td');
        var newSecondColumn = document.createElement('td');

        var newCol1 = document.createTextNode(++countLines);
        var newCol2;

        if (discr<0) newCol2 = document.createTextNode(res);
        else if (!areDifferent) newCol2 = document.createTextNode("x="+res.toFixed(4));
        else newCol2 = document.createTextNode("x1="+res.toFixed(4)+", x2="+res2.toFixed(4));

        newFirstColumn.appendChild(newCol1);
        newSecondColumn.appendChild(newCol2);
        newLine.appendChild(newFirstColumn);
        newLine.appendChild(newSecondColumn);

        pNode.parentNode.insertBefore(newLine, pNode.nextSibling);

        newLine.addEventListener('click', e => {
            newLine.remove();
            //countLines--;
        })

    }
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}