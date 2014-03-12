(function(){
	var focusClass = "focused",
		targetClass = "target";
	function removeFocused($ul){
		return $ul.find("." + focusClass).removeClass(focusClass);
	}
	function removeTarget($ul){
		return $ul.find("." + targetClass).removeClass(targetClass);
	}
	({
		ready : false,
		running : false,
		sortDivs : {
			bubble : $('#popSort'),
			quick : $('#quickSort'),
			select : $('#selectSort'),
			shell : $('#shellSort'),
			insert : $('#insertSort'),
			heap : $('#heapSort')
		},
		sortArrays : {
			bubble : null,
			quick : null,
			select : null,
			shell : null,
			insert : null,
			heap : null
		},
		bindEvent : function(){
			var _self = this;
			$('#ready').click(function(){
				var $this = $(this);
				if (_self.ready) {
					_self.running = true;
					$('#stop').prop('disabled', false);
					$this.prop('disabled', true);
					_self.startSort($('#divId').val(), +$('#speed').val());
				} else {
					$this.addClass('btn-green');
					$this.text("开始");
					_self.generateArray(+$('#seed').val(), _self.sortDivs[$('#divId').val()], $('#status').val());
					_self.ready = true;
				}
			});
			
			$('#stop').click(function(){
				if (_self.running) {
//					$('#ready').text('继续').prop('disabled', false);
					alert("点击确定以继续");
				}
			});
			$('#reset').click(function(){
				$('#stop').prop('disabled', true);
				$('#ready').text('准备').removeClass('btn-green').prop('disabled', false);
				_self.ready = false;
				_self.running = false;
				_self.reset();
			});
			
			$('#seed').on('change', function(){
				$('#reset').trigger('click');
			});
			
			$('#status').on('change', function(){
				$('#reset').trigger('click');
			});
			
			$('#divId').on('change', function(){
				$('#reset').trigger('click');
				$('.sort-box').addClass('hide');
				_self.sortDivs[this.value].parent().removeClass('hide');
			});
		},
		init : function(){
			this.bindEvent();
		},
		createArray : function(seed, status) {
			var array = [],
				newSeed = 0;
			this.seed = seed;
			for (var i = 1; i <= seed; i++) {
				array.push(i);
			}
			newSeed = status === 'false' ? (seed / 3) : seed;
			for (var i = 0; i < newSeed; i++) {
				var target = parseInt(Math.random() * seed),
					from = parseInt(Math.random() * seed),
					temp = array[from];
				array[from] = array[target];
				array[target] = temp;
			}
			for (var name in this.sortArrays) {
				this.sortArrays[name] = array.slice(0);
			}
			return array;
		},
		generateArray : function(seed, $div, status){
			var percent = 100 / seed,
				array = this.createArray(seed, status),
				li = "<ul>";
			for (var i = 0; i < seed; i++) {
				var heightPercent = (array[i] * percent);
				li += '<li class="sort-atom" style="width:'+percent+'%;height:' + heightPercent + 
							'%;top:' + (100 - heightPercent) + '%;" value="' + array[i] + '"><span>' + array[i] + '</span></li>';
			}
			$div.html(li + "</ul>");
		},
		startSort : function(sortName, ms){
			this[sortName] && this[sortName](this.sortArrays[sortName], this.sortDivs[sortName].find('ul'), ms);
		},
		reset : function(){
			for (var divName in this.sortDivs) {
				this.sortDivs[divName].find('ul').html('');
			}
		},
		finish : function(){
			this.ready = false;
			this.running = false;
			$('#ready').text('准备').removeClass('btn-green').prop('disabled', false);
			$('#stop').prop('disabled', true);
		},
		bubble : function(array, $ul, delay){
			var _self = this,
				lis = $ul.children(),
				i, j, len,
				count = 0,
				noChange = false;
			for (i = 0, len = array.length; i < len; i++) {
				noChange = true;
				for (j = 0; j < len-i-1; j++) {
					if (array[j] > array[j+1]) {
						noChange = false;
						var temp = array[j + 1];
						array[j + 1] = array[j];
						array[j] = temp;
						count++;
						(function(j, count){
							setTimeout(function(){
								removeFocused($ul);
								lis.eq(j + 1).after(lis.eq(j).addClass(focusClass));
								lis = $ul.children();
							}, delay*count);
						}(j, count));
					}
				}
				if (noChange) {
					break;
				}
			}
			setTimeout(function(){
				removeFocused($ul);
				_self.finish();
			}, delay*count);
		},
		quick : function(array, $ul, delay){
			var _self = this,
				lis = $ul.children(),
				stack = [], low = 0, high = array.length-1, mid=0, count=0;
			var percent = 100 / +_self.seed;
			var partition = function partition(arr, low, high) {
				var key = arr[low];
				while(low < high) {
					while (low < high && arr[high] >= key) {
						high--;
					}
					if (arr[high] < key) {
						console.log("arr[" + low + '] = arr[' + high + '], ' + arr[low] + '=' + arr[high]);
						arr[low] = arr[high];
						count += 1;
						(function(low, high, count){
							setTimeout(function(){
								removeFocused($ul);
								lis.eq(low).addClass(focusClass).replaceWith(lis.eq(high).clone().addClass(focusClass));
								lis = $ul.children();
							}, count*delay);
						}(low, high, count));
					}
					while(low < high && arr[low] <= key) {
						low++;
					}
					if (arr[low] > key) {
						console.log("arr[" + high + '] = arr[' + low + '], ' + arr[high] + '=' + arr[low]);
						arr[high] = arr[low];
						count += 1;
						(function(low, high, count){
							setTimeout(function(){
								removeFocused($ul);
								lis.eq(high).addClass(focusClass).replaceWith(lis.eq(low).clone().addClass(focusClass));
								lis = $ul.children();
							}, count*delay);
						}(low, high, count));
					}
				}
				console.log('key : arr[' + low + '], ' + arr[low] + '=' + key);
				arr[low] = key;
				count += 1;
				(function(low, count, key){
					setTimeout(function(){
						removeFocused($ul);
						lis.eq(low).replaceWith("<li class='sort-atom focused target' style='width:" + percent + "%;height: "
									+ key*percent + "%;top: " + (100 - key*percent) + "%;'><span>" + key + "</span></li>");
						lis = $ul.children();
					}, count * delay);
				}(low, count, key));
				return low;
			};
			//low and high push in stack by order, 用栈来保存需要排序的开始和结束索引
			if (low < high) {
				mid = partition(array, low, high);
				if (mid > low + 1) {
					stack.push(low, mid-1);
				}
				if (mid+1 < high) {
					stack.push(mid + 1, high);
				}
			}
			while(stack.length > 0) {
				var end = stack.pop(),
					begin = stack.pop();
				mid = partition(array, begin, end);
				if (mid > begin + 1) {
					stack.push(begin, mid - 1);
				}
				if (mid + 1 < end) {
					stack.push(mid + 1, end);
				}
			}
			setTimeout(function(){
				removeFocused($ul);
			}, count*delay);
			
			setTimeout(function(){
				removeTarget($ul);
				_self.finish();
			}, (count+1)*delay);
		},
		select : function(array, $ul, delay){
			var _self = this,
				lis = $ul.children(),
				count = 0,
				minIndex = 0,
				i,len,temp;
			for (i=0,len=array.length; i<len-1; i++) {
				minIndex = i;
				for (var j = i + 1; j < len; j++) {
					if (array[minIndex] > array[j]) {
						minIndex = j;
					}
				}
				count++;
				//change position
				temp = array[minIndex];
				array[minIndex] = array[i];
				array[i] = temp;
				(function(minIndex, i, count){
					setTimeout(function(){
						removeFocused($ul);
						removeTarget($ul);
						if (i === 0) {
							$ul.prepend(lis.eq(minIndex).addClass(focusClass));
						} else {
							lis.eq(i-1).after(lis.eq(minIndex).addClass(targetClass));
						}
						lis.eq(minIndex - 1).after(lis.eq(i).addClass(focusClass));
						lis = $ul.children();
					}, delay*count);
				}(minIndex, i, count));
			}
			setTimeout(function(){
				removeFocused($ul);
				removeTarget($ul);
				_self.finish();
			}, delay*count);
		},
		shell : function(array, $ul, delay){
			alert('未完成');
			this.finish();
		},
		insert : function(array, $ul, delay){
			var _self = this,
				lis = $ul.children(),
				count = 0, i, len = array.length,
				low, high,
				percent = 100 / +_self.seed;
			function resetArray(insetIndex, index) {
				if (insetIndex >= index) {
					return;
				}
				var key = array[index],
					$key = "<li class='sort-atom focused' style='width:" + percent + "%;height: "
									+ key*percent + "%;top: " + (100 - key*percent) + "%;'><span>" + key + "</span></li>";
				(function(){
					setTimeout(function(){
						removeFocused($ul);
						lis.eq(index).addClass(focusClass);
					}, count*delay);
				}(index, count));
				for (var i = index; i > insetIndex; i--) {
					count++;
					array[i] = array[i - 1];
					(function(i, count, $key){
						setTimeout(function(){
							removeFocused($ul);
							lis.eq(i).replaceWith(lis.eq(i - 1).clone());
							lis.eq(i - 1).replaceWith($key);
							lis = $ul.children();
						}, count*delay);
					}(i, count, $key));
				}
				count++;
				array[insetIndex] = key;
				(function(insetIndex, $key, count){
					setTimeout(function(){
						lis.eq(insetIndex).replaceWith($key);
						lis = $ul.children();
					}, count*delay);
				}(insetIndex, $key, count));
			}
			
			for (i = 0; i < len; i++) {
				low = 0 , high = i;
				while (high >= low) {
					var mid = parseInt((high + low) / 2);
					if (array[mid] > array[i]) {
						high = mid - 1;
					} else {
						low = mid + 1;
					}
				}
				resetArray(high + 1, i, array[i]);
			}
			setTimeout(function(){
				removeFocused($ul);
				_self.finish();
			}, (count + 1)*delay);
		},
		heap : function(array, $ul, delay){
			alert('未完成');
			this.finish();
		}
	}).init();
})();