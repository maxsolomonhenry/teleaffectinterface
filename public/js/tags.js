const tagContainer = document.querySelector('#tag-container');
const input = document.querySelector('#tag-container input');

var tags = [];

function createTag(label) {
	// Generates raw html for tags.

	// Make the <div> that houses the new tag.
	const div = document.createElement('div');
	div.setAttribute('class', 'tag');

	// Span houses the text of the tag.
	const span  = document.createElement('span');
	span.innerHTML = label;

	// Add the little 'x' for closing a tag.
	const closeBtn  = document.createElement('i');
	closeBtn.setAttribute('class', 'material-icons');
	closeBtn.setAttribute('data-item', label);
	closeBtn.innerHTML = 'close';

	// Put tag text and button in the <div>.
	div.appendChild(span);
	div.appendChild(closeBtn);

	return div;
}

function reset() {
	document.querySelectorAll('.tag').forEach(function(tag) {
		tag.parentElement.removeChild(tag);
	})
}

function addTags() {
	reset();
	tags.slice().reverse().forEach(function(tag) {
		const newInput = createTag(tag);
		tagContainer.prepend(newInput);
	})
}

input.addEventListener('keyup', function(e) {
	if (e.key === ',') {
		tags.push(input.value.slice(0,-1));
		addTags();
		input.value = '';
	}
});

document.addEventListener('click', function(e) {
	if (e.target.tagName === 'I') {
		const value = e.target.getAttribute('data-item');
		const index = tags.indexOf(value);
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)]
		addTags();
	}
})
