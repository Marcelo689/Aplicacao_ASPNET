class Carrinho {
    clickIncremento(button) {
        let data = this.getData(button);
        data.Quantidade++;
        this.postQuantidade(data);
        //debugger;
    }

    clickDecremento(button) {
        let data = this.getData(button);
        data.Quantidade--;
        this.postQuantidade(data);
        //debugger;
    }

    getData(elemento) {
        var linhaDoItem = $(elemento).parents("[item-id]");
        var itemId = $(linhaDoItem).attr("item-id");
        var novaQuantidade = $(linhaDoItem).find("input").val();

        var data = {
            Id: itemId,
            Quantidade: novaQuantidade
        };

        return data;
    }

    postQuantidade(data) {
        let token = $("[name=__RequestVerificationToken]").val();
        let headers = {};

        headers['RequestVerificationToken'] = token;
        $.ajax({
            url: "/pedido/updatequantidade",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            headers:headers
        }).done(function (response) {

            var itemPedido = response.itemPedido;
            var carrinhoViewModel = response.carrinhoViewModel;
            var linhaDoItem = $('[item-id=' + itemPedido.id + ']');
            linhaDoItem.find('input').val(itemPedido.quantidade);
            linhaDoItem.find("[subtotal]").html((itemPedido.subtotal).duasCasas());

            $("[numero-itens]").html("Total: " + carrinhoViewModel.itens.length + " itens");
            var totalHTML = $("[total]");
            var total = (carrinhoViewModel.total).duasCasas();
            totalHTML.html(total);

            if (itemPedido.quantidade == 0)
                linhaDoItem.remove();
        });
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        this.postQuantidade(data);
    }

}

var carrinho = new Carrinho();

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.',',');
}