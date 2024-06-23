$(function () {
	 // 获取 sessionStorage 中的商品 ID
	const goodsId = sessionStorage.getItem("goodsid");
	// 如果没有获取到商品 ID，弹出提示并返回
	if (!goodsId) {
		alert("商品信息不存在");
		return;
	}
	// 使用 axios 发起 GET 请求获取商品详情
	axios.get(`http://localhost:9000/goods/item/${goodsId}`).then(function (res) {
		// 判断请求是否成功
		if (res.data.code === 1) {
			const goods = res.data.info;
			// 设置商品图片
			$(".middleimg").attr("src", goods.img_big_logo);
			// 设置商品标题
			$(".title").text(goods.title);
			// 设置商品原价
			$(".old").text(goods.price);
			// 设置商品折扣类型
			$(".discount").text(goods.sale_type);
			// 设置商品当前价格
			$(".curprice").text(goods.current_price);
			// 设置商品描述
			$(".desc").html(goods.goods_introduce);
		} else {
			alert(res.data.message);
		}
	});
});
