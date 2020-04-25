$('#post-comment').hide()
$('#btn-toggle-comment').click(e => {
	$('#post-comment').slideToggle()
	e.preventDefault()
})

$('#btn-like').click(function(e) {
	const imgId = $(this).data('id')
	$.post(`/images/${imgId}/like`)
		.done(data => $('.likes-count').text(data.likes))
	e.preventDefault()
})

$('#btn-delete').click(function(e) {
	const $this = $(this)
	const res = confirm('Are you sure you want to delete this image?')
	if(res) {
		const imgId = $this.data('id')
		$.ajax({
			url: `/images/${imgId}`,
			type: 'DELETE'
		})
		.done(function(res) {
			$this.removeClass('btn-danger').addClass('btn-success')
			$this.find('i').removeClass('fa-times').addClass('fa-check')
			$this.find('span').text('Deleted!')
		})
	}
	e.preventDefault()
})