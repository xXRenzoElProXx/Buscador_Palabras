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

    // Escapar caracteres especiales en la búsqueda
    const escapedSearchWord = searchWord.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

    // Identificar el tipo de búsqueda
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

    // Crear la expresión regular para buscar el término
    const regex = new RegExp(`(${escapedSearchWord})`, 'gi');
    const matches = (inputText.match(regex) || []).length;
    const highlightedText = inputText.replace(regex, '<span class="highlight">$1</span>');

    // Mostrar el texto resaltado o un mensaje si no se encuentran resultados
    resultContainer.innerHTML = highlightedText || 'No se encontraron resultados.';

    // Ajustar el texto del contador
    const singular = searchType === 'número' ? 'número' : searchType === 'letra' ? 'letra' : 'símbolo';
    const plural = searchType === 'número' ? 'números' : searchType === 'letra' ? 'letras' : 'símbolos';
    const timesText = matches === 1 ? 'vez' : 'veces';

    countContainer.innerHTML = `El ${singular} "${searchWord}" se repite ${matches} ${timesText}.`;
}
