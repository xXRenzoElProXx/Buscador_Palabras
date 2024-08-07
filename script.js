function highlightWord() {
    const inputText = document.getElementById('inputText').value;
    const searchWord = document.getElementById('searchWord').value.trim();
    const resultContainer = document.getElementById('resultContainer');
    const countContainer = document.getElementById('countContainer');

    if (searchWord === '') {
        resultContainer.innerHTML = 'Por favor, ingresa un texto para buscar.';
        countContainer.innerHTML = '';
        return;
    }

    const escapedSearchWord = searchWord.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

    let searchType;
    if (/^\d+$/.test(searchWord)) {
        searchType = 'número';
    } else if (/^[a-zA-Z]+$/.test(searchWord)) {
        searchType = 'letra';
    } else if (/[-[\]/{}()*+?.\\^$|]/.test(searchWord)) {
        searchType = 'símbolo';
    } else {
        searchType = 'texto';
    }

    const regex = new RegExp(`(${escapedSearchWord})`, 'gi');
    const matches = (inputText.match(regex) || []).length;
    const highlightedText = inputText.replace(regex, '<span class="highlight">$1</span>');

    resultContainer.innerHTML = highlightedText || 'No se encontraron resultados.';

    const singular = searchType === 'número' ? 'número' : searchType === 'letra' ? 'letra' : 'símbolo';
    const plural = searchType === 'número' ? 'números' : searchType === 'letra' ? 'letras' : 'símbolos';
    const timesText = matches === 1 ? 'vez' : 'veces';

    countContainer.innerHTML = `El ${singular} "${searchWord}" se repite ${matches} ${timesText}.`;
}
