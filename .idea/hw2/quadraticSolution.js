var countLines = 0;

function changeTable() {
    var a = document.getElementById('text1').value;
    var b = document.getElementById('text2').value;
    var c = document.getElementById('text3').value;

    if(!(isNumeric(a)&&isNumeric(b)&&isNumeric(c))) alert("Некорректные данные. Убедитесь, что заполнены все поля и введены числовые значения.");
    else if (parseFloat(a)==0) alert("Данное уравнение не является квадратным! Введите ненулевую старшую степень.");
    else {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);

        var quadrParam = equationSolution(a, b, c);
        var discr = quadrParam.discr;
        var res = quadrParam.res;
        var areDifferent = quadrParam.areDifferent;
        var res2 = quadrParam.res2;

        var pNode = document.getElementById('table');
        var newLine = document.createElement('tr');
        var newFirstColumn = document.createElement('td');
        var newSecondColumn = document.createElement('td');
        var newThirdColumn = document.createElement('td');

        var newCol1 = document.createTextNode(++countLines);
        var newCol2 = document.createTextNode(showEquation(a,b,c));
        var newCol3;

        if (discr<0) newCol3 = document.createTextNode(res);
        else if (!areDifferent) newCol3 = document.createTextNode("x="+res.toFixed(4));
        else newCol3 = document.createTextNode("x1="+res.toFixed(4)+", x2="+res2.toFixed(4));

        newFirstColumn.appendChild(newCol1);
        newSecondColumn.appendChild(newCol2);
        newThirdColumn.appendChild(newCol3);
        newLine.appendChild(newFirstColumn);
        newLine.appendChild(newSecondColumn);
        newLine.appendChild(newThirdColumn);

        pNode.parentNode.insertBefore(newLine, pNode.nextSibling);

        newLine.addEventListener('click', e => {
            newLine.remove();
        })

    }
}

function equationSolution(a, b, c) {
    var discr, res, areDifferent=false, res2;
    discr = b*b-4*a*c;
    if (discr<0) res = "нет действительных корней";
    else if (discr == 0) res=-b/(2*a);
    else {
        areDifferent = true;
        res=(-b-Math.sqrt(discr))/(2*a);
        res2=(-b+Math.sqrt(discr))/(2*a);
    }
    return {
        discr: discr, res: res, areDifferent: areDifferent, res2: res2
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

function numberWithSign(num) {
    return (num<0) ? "-"+Math.abs(num) : "+"+Math.abs(num);
}

function coefIsOne (num) {
    if (num==1) return "";
    else if (num==-1) return "-";
    else return num;
}

function showEquation (a, b, c) {
    var res = coefIsOne(a)+"x^2";
    if (b!=0 && b==1) res+="+x";
    else if (b!=0 && b==-1) res+="-x";
    else if (b!=0) res+=numberWithSign(b)+"x";
    if (c!=0) res+=numberWithSign(c);
    return res;
}