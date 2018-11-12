export const initSize = () => {
    function setRem() {
        let viewWidth = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = (viewWidth / 3.75) + 'px';
    }
    setRem();
    window.addEventListener('resize', setRem)
};
