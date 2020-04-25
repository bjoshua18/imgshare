$('#btn-like').click(function(e) {
	const imgId = $(this).data('id')
	$.post(`/images/${imgId}/like`)
		.done(data => $('.likes-count').text(data.likes))
	e.preventDefault()
})