import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/menuData'
import { CheckCircle2, ChevronRight, CreditCard, Banknote, QrCode, ArrowLeft, ShoppingBag, ClipboardList, Clock, Utensils, Dices, Copy, Check, Printer, Coffee } from 'lucide-react'
import './Checkout.css'

const PAYMENT_METHODS = [
  { id: 'cash',     label: 'Bayar di Kasir', icon: <Banknote size={20} />, desc: 'Bayar tunai langsung di meja kasir' },
  { id: 'transfer', label: 'Transfer Bank',   icon: <CreditCard size={20} />, desc: 'BCA / Mandiri / BNI / BRI' },
  { id: 'qris',     label: 'QRIS',            icon: <QrCode size={20} />, desc: 'Scan QR dengan semua e-wallet & m-Banking' },
]

const BANK_ACCOUNTS = [
  { bank: 'BCA', number: '1234567890', owner: 'PT Loka Cafe Indonesia' },
  { bank: 'Mandiri', number: '1370009876543', owner: 'PT Loka Cafe Indonesia' },
  { bank: 'BNI', number: '0987654321', owner: 'PT Loka Cafe Indonesia' },
  { bank: 'BRI', number: '601201009988531', owner: 'PT Loka Cafe Indonesia' },
]

function genOrderId() {
  return 'LKA-' + Math.floor(Date.now() / 1000).toString().slice(-6).toUpperCase()
}

export default function Checkout() {
  const { items, totalPrice, orderNote, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]                 = useState(1) // 1=form, 2=confirm, 3=success
  const [payment, setPayment]           = useState('cash')
  const [selectedBank, setSelectedBank] = useState('BCA')
  const [copiedIndex, setCopiedIndex]   = useState(null)
  const [orderId]                       = useState(genOrderId)
  const [form, setForm]                 = useState({ name: '', table: '', phone: '', note: orderNote })
  const [errors, setErrors]             = useState({})
  
  const [completedOrder, setCompletedOrder] = useState(null)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim())  errs.name  = 'Nama wajib diisi'
    if (!form.table.trim()) errs.table = 'Nomor meja wajib diisi'
    return errs
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep(2)
  }

  const handleConfirm = () => {
    setCompletedOrder({
      items: [...items],
      totalPrice,
      paymentLabel: PAYMENT_METHODS.find(m => m.id === payment)?.label,
      form: { ...form },
      date: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })
    })
    setStep(3)
    clearCart()
  }

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="checkout-empty">
        <div className="container" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <ShoppingBag size={48} style={{ color: 'var(--clr-text-dim)', marginBottom: '1rem' }} />
          <h2>Keranjang Kosong</h2>
          <p>Tambahkan menu terlebih dahulu sebelum checkout.</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/menu')}>Lihat Menu</button>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-inner">

        {/* ─── STEP INDICATOR ─── */}
        {step < 3 && (
          <div className="checkout-steps no-print">
            {['Detail Pesanan', 'Konfirmasi', 'Selesai'].map((label, i) => (
              <div key={i} className={`checkout-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="checkout-step__dot">{step > i ? <CheckCircle2 size={14} /> : i + 1}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ─── STEP 1: FORM ─── */}
        {step === 1 && (
          <div className="checkout-layout">
            <div className="checkout-form-section">
              <button className="btn btn-ghost btn-sm checkout-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Kembali
              </button>
              <h2>Detail <span className="gradient-text">Pesanan</span></h2>

              <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-name">Nama Pemesan *</label>
                  <input id="co-name" name="name" className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="Contoh: Budi Santoso" value={form.name} onChange={handleChange} />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="co-table">Nomor Meja *</label>
                  <input id="co-table" name="table" className={`form-input ${errors.table ? 'form-input--error' : ''}`}
                    placeholder="Contoh: 7 atau VIP-1" value={form.table} onChange={handleChange} />
                  {errors.table && <span className="form-error">{errors.table}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="co-phone">No. WhatsApp (opsional)</label>
                  <input id="co-phone" name="phone" className="form-input" type="tel"
                    placeholder="08xxxxxxxxxx" value={form.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="co-note">Catatan Khusus</label>
                  <textarea id="co-note" name="note" className="form-input" rows={3}
                    placeholder="Contoh: tidak pakai kecap, extra sambal..." value={form.note} onChange={handleChange} />
                </div>

                {/* Payment method */}
                <div className="form-group">
                  <label className="form-label">Metode Pembayaran</label>
                  <div className="payment-methods">
                    {PAYMENT_METHODS.map(m => (
                      <label key={m.id} className={`payment-method ${payment === m.id ? 'payment-method--active' : ''}`}>
                        <input type="radio" name="payment" value={m.id}
                          checked={payment === m.id} onChange={() => setPayment(m.id)} hidden />
                        <span className="payment-method__icon">{m.icon}</span>
                        <div>
                          <p className="payment-method__label">{m.label}</p>
                          <p className="payment-method__desc">{m.desc}</p>
                        </div>
                        <div className={`payment-method__radio ${payment === m.id ? 'checked' : ''}`} />
                      </label>
                    ))}
                  </div>
                </div>

                <button id="checkout-next-btn" type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Review Pesanan <ChevronRight size={18} />
                </button>
              </form>
            </div>

            {/* Order Summary sidebar */}
            <aside className="checkout-summary glass-card">
              <h4>Ringkasan Pesanan</h4>
              <ul className="checkout-summary__list">
                {items.map(item => (
                  <li key={item.id} className="checkout-summary__item">
                    <span className="checkout-summary__item-name">
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: 16, height: 16, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                      ) : item.icon === 'Clock' ? <Clock size={16} /> : item.icon === 'Dices' ? <Dices size={16} /> : <Utensils size={16} />}
                      {item.name}
                    </span>
                    <span className="checkout-summary__item-detail">
                      x{item.qty} · {formatPrice(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="checkout-summary__divider" />
              <div className="checkout-summary__total">
                <span>Total</span>
                <span className="checkout-summary__amount">{formatPrice(totalPrice)}</span>
              </div>
            </aside>
          </div>
        )}

        {/* ─── STEP 2: CONFIRM ─── */}
        {step === 2 && (
          <div className="checkout-confirm glass-card">
            <h2>Konfirmasi <span className="gradient-text">Pesanan</span></h2>
            <div className="confirm-info">
              <div className="confirm-row"><span>Nama</span><strong>{form.name}</strong></div>
              <div className="confirm-row"><span>No. Meja</span><strong>{form.table}</strong></div>
              {form.phone && <div className="confirm-row"><span>WhatsApp</span><strong>{form.phone}</strong></div>}
              {form.note  && <div className="confirm-row"><span>Catatan</span><strong>{form.note}</strong></div>}
              <div className="confirm-row"><span>Pembayaran</span>
                <strong>{PAYMENT_METHODS.find(m => m.id === payment)?.label}</strong>
              </div>
            </div>

            {/* ─── Rincian Transfer Bank ─── */}
            {payment === 'transfer' && (
              <div 
                className="bank-payment-box"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  margin: '0.5rem 0'
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Pilih Bank Tujuan:</p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {BANK_ACCOUNTS.map(acc => (
                    <button
                      key={acc.bank}
                      type="button"
                      className={`btn btn-sm ${selectedBank === acc.bank ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setSelectedBank(acc.bank)}
                    >
                      {acc.bank}
                    </button>
                  ))}
                </div>

                {(() => {
                  const b = BANK_ACCOUNTS.find(a => a.bank === selectedBank) || BANK_ACCOUNTS[0]
                  return (
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.85rem', borderRadius: '8px' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-dim)', margin: 0 }}>Bank {b.bank}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0' }}>
                        <strong style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>{b.number}</strong>
                        <button 
                          className="btn btn-ghost btn-sm" 
                          onClick={() => copyToClipboard(b.number, b.bank)}
                          style={{ padding: '4px 8px' }}
                        >
                          {copiedIndex === b.bank ? <Check size={16} color="var(--clr-primary)" /> : <Copy size={16} />}
                        </button>
                      </div>
                      <p style={{ fontSize: '0.8rem', margin: 0 }}>a.n. <strong>{b.owner}</strong></p>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* ─── Rincian QRIS ─── */}
            {payment === 'qris' && (
              <div 
                className="qris-payment-box" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  padding: '1.25rem', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '12px', 
                  margin: '0.5rem 0',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <p style={{ marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>Scan QRIS di bawah ini:</p>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LOKA-${orderId}-${totalPrice}`} 
                  alt="QRIS Payment" 
                  style={{ borderRadius: '8px', background: '#fff', padding: '8px', display: 'block' }} 
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-dim)', marginTop: '0.75rem', maxWidth: '280px' }}>
                  Bisa menggunakan GoPay, OVO, Dana, ShopeePay, BCA Mobile, atau Mobile Banking lainnya.
                </p>
              </div>
            )}

            <div className="confirm-items">
              {items.map(item => (
                <div key={item.id} className="confirm-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: 16, height: 16, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                    ) : item.icon === 'Clock' ? <Clock size={16} /> : item.icon === 'Dices' ? <Dices size={16} /> : <Utensils size={16} />}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                    <em style={{ fontStyle: 'normal', color: 'var(--clr-text-muted)', flexShrink: 0 }}>x{item.qty}</em>
                  </span>
                  <span style={{ flexShrink: 0, marginLeft: '8px' }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="confirm-total">
              <span>Total Pembayaran</span>
              <span className="confirm-total__amount">{formatPrice(totalPrice)}</span>
            </div>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Edit
              </button>
              <button id="confirm-order-btn" className="btn btn-primary btn-lg" onClick={handleConfirm}>
                <CheckCircle2 size={18} /> Konfirmasi
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SUCCESS & STRUK CETAK ELEGAN ─── */}
        {step === 3 && completedOrder && (
          <div className="checkout-success">
            <div className="no-print" style={{ width: '100%', textAlign: 'center' }}>
              <div className="success-icon"><CheckCircle2 size={48} color="var(--clr-primary)" /></div>
              <h2>Pesanan <span className="gradient-text">Diterima!</span></h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                Terima kasih, <strong>{completedOrder.form.name}</strong>! Pesananmu sedang diproses.
              </p>
              
              <div className="success-order-id glass-card" style={{ marginBlock: '1rem' }}>
                <p className="success-order-label">ORDER ID</p>
                <p className="success-order-number">{orderId}</p>
              </div>

              <div className="success-info glass-card">
                <p><ClipboardList size={16} /> Pesanan dikirim ke <strong>Meja {completedOrder.form.table}</strong></p>
                <p><CreditCard size={16} /> Pembayaran via <strong>{completedOrder.paymentLabel}</strong></p>
                <p><Clock size={16} /> Estimasi waktu: <strong>10–15 menit</strong></p>
              </div>
            </div>

            {/* ─── STRUK CASUAL & ELEGAN DENGAN LOGO ─── */}
            <div className="printable-receipt">
              <div className="receipt-header">
                <div className="receipt-logo">
                  <Coffee size={18} /> LOKA CAFE
                </div>
                <div className="receipt-address">Jl. ChezNous No. 01</div>
                <div className="receipt-address">Telp: 0812-3456-7890</div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-meta">
                <div className="receipt-meta-row"><span>ID:</span><span>{orderId}</span></div>
                <div className="receipt-meta-row"><span>Tgl:</span><span>{completedOrder.date}</span></div>
                <div className="receipt-meta-row"><span>Pelanggan:</span><span>{completedOrder.form.name}</span></div>
                <div className="receipt-meta-row"><span>Meja:</span><span>{completedOrder.form.table}</span></div>
                <div className="receipt-meta-row"><span>Bayar:</span><span>{completedOrder.paymentLabel}</span></div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-items">
                {completedOrder.items.map(item => (
                  <div key={item.id} className="receipt-item-row">
                    <div className="receipt-item-info">
                      <span className="receipt-item-title">{item.name}</span>
                      <span className="receipt-item-qty">{item.qty} x {formatPrice(item.price)}</span>
                    </div>
                    <span className="receipt-item-price">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider" />

              <div className="receipt-totals">
                <div className="receipt-total-row">
                  <span>TOTAL</span>
                  <span>{formatPrice(completedOrder.totalPrice)}</span>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-footer">
                <p style={{ fontWeight: 700, margin: 0, color: '#0f172a' }}>-- Terima Kasih --</p>
                <p style={{ margin: '2px 0 0 0' }}>Selamat Menikmati!</p>
              </div>
            </div>

            {/* Tombol Navigasi & Cetak */}
            <div className="success-actions no-print">
              <button className="btn btn-secondary" onClick={handlePrintReceipt}>
                <Printer size={16} /> Cetak Struk
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/menu')}>Pesan Lagi</button>
              <button className="btn btn-primary" onClick={() => navigate('/')}>Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}