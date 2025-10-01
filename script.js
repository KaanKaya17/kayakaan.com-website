const words = ["Android Applications", "Creative Ideas", "Smart Projects"];
const printTime = 3000; // yazma süresi
const readTime = 2000;  // okuma süresi
const deleteTime = 1500; // silme süresi

const output = document.getElementById("output");

let wordIndex = 0;

function typeWord(word, callback) {
    const baseStart = "<code> I build ";
    const baseEnd = " </code>";
    let i = 0;
    const intervalTime = printTime / word.length;

    output.innerHTML = baseStart; // başlangıç <code> I build

    const interval = setInterval(() => {
        output.innerHTML += word[i];
        i++;
        if (i === word.length) {
            output.innerHTML += baseEnd; // bitiş </code> ekle
            clearInterval(interval);
            setTimeout(callback, readTime);
        }
    }, intervalTime);
}

function deleteWord(callback) {
    const baseStart = "<code> I build ";
    const baseEnd = " </code>";

    let content = output.innerHTML;

    // <code> I build ... </code> içindeki kelimeyi ayıkla
    const match = content.match(/<code> I build (.*?) <\/code>/);
    if (!match || !match[1]) {
        callback();
        return;
    }

    let word = match[1];
    let i = word.length;
    const intervalTime = deleteTime / i;

    const interval = setInterval(() => {
        word = word.slice(0, -1);
        output.innerHTML = baseStart + word + baseEnd;
        i--;
        if (i === 0) {
            clearInterval(interval);
            setTimeout(callback, 300);
        }
    }, intervalTime);
}

function cycle() {
    const word = words[wordIndex];
    typeWord(word, () => {
        deleteWord(() => {
            wordIndex = (wordIndex + 1) % words.length;
            cycle();
        });
    });
}

cycle();