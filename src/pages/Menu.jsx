import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  FOOD_ITEMS, DRINK_NON_COFFEE, DRINK_COFFEE, PLAY_PACKAGES, formatPrice
} from '../data/menuData'
import { ShoppingCart, Search, Filter, Utensils, Coffee, CupSoda, Dices, Clock, Plus, Minus, Check } from 'lucide-react'
import './Menu.css'

const TABS = [
  { id: 'all',        label: 'Semua', icon: <Utensils size={16} /> },
  { id: 'food',       label: 'Makanan', icon: <Utensils size={16} /> },
  { id: 'non-coffee', label: 'Non-Coffee', icon: <CupSoda size={16} /> },
  { id: 'coffee',     label: 'Coffee & Signature', icon: <Coffee size={16} /> },
  { id: 'play',       label: 'Paket Main', icon: <Dices size={16} /> },
]

const ALL = [
  ...FOOD_ITEMS,
  ...DRINK_NON_COFFEE,
  ...DRINK_COFFEE,
  ...PLAY_PACKAGES,
]

function ItemCard({ item, cartQuantity, onIncrease, onDecrease }) {
  const renderVisual = () => {
    if (item.image) {
      return <img src={item.image} alt={item.name} className="item-card__image" />
    }
    if (item.icon === 'Clock') return <Clock size={48} className="item-card__icon" />
    if (item.icon === 'Dices') return <Dices size={48} className="item-card__icon" />
    return <Utensils size={48} className="item-card__icon" />
  }

  return (
    <div className="item-card glass-card">
      <div className="item-card__visual-wrap">
        {renderVisual()}
        {item.tag && <span className="item-card__tag">{item.tag}</span>}
      </div>
      <div className="item-card__body">
        <h4 className="item-card__name">{item.name}</h4>
        <p className="item-card__desc">{item.description}</p>
        <div className="item-card__footer">
          <div>
            <span className="item-card__price">{formatPrice(item.price)}</span>
            {item.unit && <span className="item-card__unit"> {item.unit}</span>}
          </div>

          {/* Dynamic Action: Direct Add or Quantity Control */}
          {cartQuantity === 0 ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onIncrease(item)}
              id={`add-${item.id}`}
            >
              <ShoppingCart size={14} />
              Pesan
            </button>
          ) : (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '2px 6px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                style={{ padding: '4px', minWidth: '24px', height: '24px' }}
                onClick={() => onDecrease(item)}
              >
                <Minus size={12} />
              </button>
              <span style={{ fontWeight: 'bold', fontSize: '0.85rem', minWidth: '18px', textAlign: 'center' }}>
                {cartQuantity}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                style={{ padding: '4px', minWidth: '24px', height: '24px' }}
                onClick={() => onIncrease(item)}
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const { cartItems, addItem, removeItem } = useCart()
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch]       = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = ALL.filter(item => {
    const matchTab    = activeTab === 'all' || item.category === activeTab
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  // Toast Notification Helper
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2000)
  }

  const handleAddItem = (item) => {
    addItem(item)
    triggerToast(`${item.name} ditambahkan ke keranjang!`)
  }

  const handleRemoveItem = (item) => {
    if (removeItem) {
      removeItem(item.id)
    }
  }

  // Mendapatkan jumlah item terkini yang ada di keranjang
  const getItemQuantity = (itemId) => {
    if (!cartItems) return 0
    const found = cartItems.find(i => i.id === itemId)
    return found ? found.quantity || 1 : 0
  }

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-page__header">
        <div className="menu-page__header-bg" />
        <div className="container menu-page__header-content">
          <span className="section-label"><Filter size={12} />Katalog Lengkap</span>
          <h1>Menu <span className="gradient-text">ChezNous</span></h1>
          <p>Pilih dari berbagai macam makanan, minuman, dan paket main favoritmu!</p>
        </div>
      </div>

      <div className="container menu-page__body">
        {/* Search Bar */}
        <div className="menu-search-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          <Search 
            size={18} 
            className="menu-search-icon" 
            style={{ position: 'absolute', left: '1rem', pointerEvents: 'none', zIndex: 1, opacity: 0.6 }} 
          />
          <input
            id="menu-search"
            className="form-input menu-search"
            type="text"
            placeholder="Cari menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '2.75rem', width: '100%' }}
          />
        </div>

        {/* Tabs */}
        <div className="menu-tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`menu-tab ${activeTab === t.id ? 'menu-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon} <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filtered.length === 0 ? (
          <div className="menu-empty">
            <p>🔍 Tidak ada menu yang cocok.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                cartQuantity={getItemQuantity(item.id)}
                onIncrease={handleAddItem}
                onDecrease={handleRemoveItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#10b981',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '10px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10000,
          fontWeight: 500,
          fontSize: '0.9rem',
          backdropFilter: 'blur(8px)'
        }}>
          <Check size={18} /> {toastMessage}
        </div>
      )}
    </div>
  )
}