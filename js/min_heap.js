let MinHeap = function (initialState = null) {

	let heap = [null];

	if(initialState instanceof Turn) heap.push(initialState);

	this.insert = (turn) => {
		heap.push(turn);
		if (heap.length > 2) {
			let idx = heap.length - 1;
			while (heap[idx].getScore() < heap[Math.floor(idx / 2)].getScore()) {
				if (idx >= 1) {
					[heap[Math.floor(idx / 2)], heap[idx]] = [heap[idx], heap[Math.floor(idx / 2)]];
					if (Math.floor(idx / 2) > 1) {
						idx = Math.floor(idx / 2);
					} else {
						break;
					};
				};
			};
		};
	};

	this.extractMin = () => {
		let smallest = heap[1];
		if (heap.length > 2) {
			heap[1] = heap[heap.length - 1];
			heap.splice(heap.length - 1);
			if (heap.length == 3) {
				if (heap[1].getScore() > heap[2].getScore()) {
					[heap[1], heap[2]] = [heap[2], heap[1]];
				};
				return smallest;
			};
			let i = 1;
			let left = 2 * i;
			let right = 2 * i + 1;
			while ((heap[left] != undefined && heap[right] != undefined) && (heap[i].getScore() >= heap[left].getScore() || heap[i].getScore() >= heap[right].getScore())) {
				if (heap[left].getScore() < heap[right].getScore()) {
					[heap[i], heap[left]] = [heap[left], heap[i]];
					i = 2 * i
				} else {
					[heap[i], heap[right]] = [heap[right], heap[i]];
					i = 2 * i + 1;
				};
				left = 2 * i;
				right = 2 * i + 1;
				// if (heap[left] == undefined || heap[right] == undefined) {
				// 	break;
				// };
			};
		} else if (heap.length == 2) {
			heap.splice(1, 1);
		} else {
			return null;
		};
		return smallest;
	};

	this.isEmpty = () => {
		return heap.length <= 1;
	}
};