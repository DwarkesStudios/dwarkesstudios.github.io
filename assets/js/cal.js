(function($)
{
	$('.squareMeterBlock').hide();
	$('.nonSquareMeterBlock').show();
	/*$(window).load(function(){
		$(".currencyConvert").click();
	});*/
	$(document).on("change", "#scaleUnit", function(){
		var scaleUnit = $('#scaleUnit').val();
		if(scaleUnit=="mt"){
			$('.scaleUnitPrint').html('in Meter');
			$('.squareMeterBlock').hide();
			$('.nonSquareMeterBlock').show();
		}
		if(scaleUnit=="ft"){
			$('.scaleUnitPrint').html('in Feet');
			$('.squareMeterBlock').hide();
			$('.nonSquareMeterBlock').show();
		}
		if(scaleUnit=="sqmt"){
			$('.squareMeterBlock').show();
			$('.nonSquareMeterBlock').hide();
		}
	});
	$(document).on("click", ".calculateTile", function(){
		var tileWidth = parseFloat($('#tileWidth').val());
		var tileLength = parseFloat($('#tileLength').val());
		var squareMeter = parseFloat($('#squareMeter').val());
		var scaleUnit = $('#scaleUnit').val();
			
	
		if((tileWidth=="" || $.isNumeric(tileWidth)==null) && (tileLength=="" || $.isNumeric(tileLength)==null)){
			$('#tileWidth').focus();
			alert("Please Enter Width and Length.");	
			return false;
		}else{
			if(scaleUnit!="sqmt"){
				if(!tileWidth){
					$('#tileWidth').focus();
					alert("Please Enter digit only.");	
					return false;
				}
				if(!tileLength){
					$('#tileLength').focus();
					alert("Please Enter digit only.");	
					return false;
				}
			}else{
				if(!squareMeter){
					$('#squareMeter').focus();
					alert("Please Enter digit only.");	
					return false;
				}	
			}
		}
		
		var tile_width = parseInt($('#tileInBox').find(':selected').attr('data-width'));
		var tile_height = parseInt($('#tileInBox').find(':selected').attr('data-height'));
		var tileInBox = parseInt($('#tileInBox').find(':selected').attr('data-tiles'));
				
		if(scaleUnit=="ft")
		{
			/* Here 1ft = 304.80mm */
			var tile_width_ft = (tile_width / 304.80);
			var tile_height_ft = (tile_height / 304.80);
			
			var tile_sqft = (tile_width_ft * tile_height_ft);
			var floor_sqft = (tileWidth * tileLength);
			
			var total_tiles = Math.ceil(floor_sqft/tile_sqft);
			var total_boxes = Math.ceil(total_tiles/tileInBox);
			
			var tileOutput = '<li><div class="tileDiv"><div style="width:70%; height:60%;"><p class="tileFt horzFt"><span>' + tileWidth + scaleUnit + '</span></p><p class="tileFt vertFt"><span>' + tileLength + scaleUnit + '</span></p></div></div><div class="calcData"><img src="assets/img/cal/tileIcon.png" alt="Total Tiles Required"><p>Total <strong class="tileCount">'+ total_tiles +' Tiles</strong> <br><i>Required</i></p></div><div class="calcData"><img src="assets/img/cal/boxIcon.png" alt="Total Tiles Required"><p><strong class="boxCount">'+ total_boxes +' Boxes</strong> <br><i>Required</i> <br> <small class="tiles_in_box">[ 1 Box = ' + tileInBox + ' Tiles ]</small></p></div></li>';
		
		}
		if(scaleUnit=="mt")
		{
			/* Here 1mt = 1000.00mm */
			var tile_width_mt = (tile_width / 1000.00);
			var tile_height_mt = (tile_height / 1000.00);
			
			var tile_sqft = (tile_width_mt * tile_height_mt);
			var floor_sqft = (tileWidth * tileLength);
			
			var total_tiles = Math.ceil(floor_sqft/tile_sqft);
			var total_boxes = Math.ceil(total_tiles/tileInBox);
			
			var tileOutput = '<li><div class="tileDiv"><div style="width:70%; height:60%;"><p class="tileFt horzFt"><span>' + tileWidth + scaleUnit + '</span></p><p class="tileFt vertFt"><span>' + tileLength + scaleUnit + '</span></p></div></div><div class="calcData"><img src="assets/img/cal/tileIcon.png" alt="Total Tiles Required"><p>Total <strong class="tileCount">'+ total_tiles +' Tiles</strong> <br><i>Required</i></p></div><div class="calcData"><img src="assets/img/cal/boxIcon.png" alt="Total Tiles Required"><p><strong class="boxCount">'+ total_boxes +' Boxes</strong> <br><i>Required</i> <br> <small class="tiles_in_box">[ 1 Box = ' + tileInBox + ' Tiles ]</small></p></div></li>';
		}
		if(scaleUnit=="sqmt")
		{
			
			/* Here 1sm = 1000000.00smm */
			
			var tile_sqft = parseFloat((squareMeter));
			var floor_sqft = parseFloat((tile_width/1000.00) * (tile_height/1000.00));
			
			var total_tiles = Math.ceil(tile_sqft/floor_sqft);
			var total_boxes = Math.ceil(total_tiles/tileInBox);
			
			var tileOutput = '<li><div class="tileDiv"><div style="width:70%; height:60%;"><p class="tileFt horzFt"><span>' + squareMeter + scaleUnit + '</span></p><p class="tileFt vertFt"><span>' + squareMeter + scaleUnit + '</span></p></div></div><div class="calcData"><img src="assets/img/cal/tileIcon.png" alt="Total Tiles Required"><p>Total <strong class="tileCount">'+ total_tiles +' Tiles</strong> <br><i>Required</i></p></div><div class="calcData"><img src="assets/img/cal/boxIcon.png" alt="Total Tiles Required"><p><strong class="boxCount">'+ total_boxes +' Boxes</strong> <br><i>Required</i> <br> <small class="tiles_in_box">[ 1 Box = ' + tileInBox + ' Tiles ]</small></p></div></li>';
		}
		
		$('.tileCalcList').html(tileOutput);
		
		
		/*var comm_get_data = "tileWidth="+tileWidth+"&tileLength="+tileLength+"&tileInBox="+tileInBox;
		$.ajax(
		{
			type: "post",
			url: defaultPath+'ajax/ajax.php',
			data: comm_get_data,
			success: function(msg){
			  $('.tileCalcList').html(msg);
			},
		});	*/	
	});
	
})(jQuery);