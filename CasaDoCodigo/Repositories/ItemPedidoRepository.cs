using CasaDoCodigo.Models;
using System.Linq;

namespace CasaDoCodigo.Repositories
{
    public interface IItemPedidoRepository
    {
        ItemPedido GetItem(int id);
        void RemoveItemPedido(int itemPedidoId);
    }

    public class ItemPedidoRepository : BaseRepository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(ApplicationContext contexto) : base(contexto)
        {
        }
        
        public ItemPedido GetItem(int id)
        {
            var item = dbSet.Where(ip => ip.Id == id).First();
            return item;
        }

        public void RemoveItemPedido(int itemPedidoId)
        {
            var itemPedido = GetItem(itemPedidoId);
            dbSet.Remove(itemPedido);
        }
    }
}