/* Lógica de la propuesta Alex Cordobes */
window.__dcSchedule = function () {};
function DCLogic(props) { this.props = props || {}; this.state = {}; }
DCLogic.prototype.setState = function (o) { Object.assign(this.state, o); window.__dcSchedule(); };
DCLogic.prototype.forceUpdate = function () { window.__dcSchedule(); };
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { page: 'home', cake: 'tradicional', gi: 0, info: null, drawer: false, menu: false, store: 'vel', dayIso: null, showAll: false, cart: {}, sizes: {}, faq: null, cookies: 'pending' };
  }

  iso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  go(page, extra) {
    this.setState(Object.assign({ page: page, menu: false, drawer: false, gi: 0, info: null }, extra || {}));
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  renderVals() {
    const S = this.state;
    const B = (id) => '/_blob/' + id;
    const DOW = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const DOWS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    const MON = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const MONS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const NOOR_ISO = '2026-10-10';
    const euro = (n) => n.toLocaleString('es-ES') + ' €';
    const nav = (page, extra) => (e) => { if (e && e.preventDefault) e.preventDefault(); this.go(page, extra); };

    // ---------- Catálogo (textos, precios y fotos de alexcordobes.es) ----------
    const M8 = 'Mediana · 8 personas';
    const CAKES = [
      { id: 'tradicional', name: 'Tradicional', cover: 'b3abcffca4b9d3790c3a0b8d1537f350', g: ['a1bbf0a8b2e3cc4085c801ff3635d80e', 'cfbf64b54c23d9740e651cc736666b1d', '655a9e399c3fab1bc017ef6643ecb4f4'],
        note: 'Base de galleta con mantequilla, queso cremoso y capa tostada. La original.',
        desc: ['Nuestra tarta de queso original, elaborada a diario en nuestro obrador: una base de galleta con mantequilla bajo un manto de queso cremoso, recubierto con una capa tostada de Maillard.', 'La tarta perfecta para los amantes de la tradición y la cremosidad.'],
        sizes: [[M8, 35], ['Grande · 12 personas', 45]] },
      { id: 'pistacho', name: 'Pistacho ibérico', cover: '6da25abba90970508f10638c50e9194a', g: ['53fb6b1ff588dd0009bd635420fadf6e', '8a840b045775797833abc36808711f59', '95d3cf9985ccd88388fef41a28739ca3'],
        note: 'Cremosidad láctica con el amargor y el crujiente del pistacho.',
        desc: ['Para los entusiastas del pistacho, una de nuestras tartas más atrevidas.', 'Sobre la base de la tradicional, combina la suavidad y la cremosidad láctica con un suave amargor, dulzor y crujiente del pistacho.'],
        sizes: [[M8, 38]] },
      { id: 'belga', name: 'Chocolate belga', cover: '44985785daf4fd4c38941dfd4b61c0c5', g: ['d63a719d039075fd0c46f656327a324c', '17431a154cd52368b6f4c630b31d5368', 'e6c5efa561b2e1e83f24f8149c9f57f4'],
        note: 'Chocolate negro y con leche sobre la tradicional. Equilibrada y cremosa.',
        desc: ['Nuestra tarta tradicional fusionada con una selección de chocolates negro y con leche.', 'Lo lácteo y salino del queso marida con el amargor y el dulzor del cacao: una tarta equilibrada y cremosa.'],
        sizes: [[M8, 35]] },
      { id: 'blanco', name: 'Chocolate blanco', cover: '13fbd5412f4d6cb5f06b4c621ff9ea09', g: ['6d57a76502014ee5f907ea2154f02f0c', 'a31240f173fde2a18a94ea6b4eddbb98', '04a3dbbdc60d6f0d2b0c4ffeda2e34a1'],
        note: 'Con manteca de cacao: elegante, muy cremosa y de dulzor sutil.',
        desc: ['Una de nuestras tartas más atrevidas y gamberras.', 'Partimos de la tarta de queso tradicional e incorporamos manteca de cacao para lograr una tarta elegante, extremadamente cremosa y de dulzor sutil.'],
        sizes: [[M8, 35]] },
      { id: 'dulce', name: 'Dulce de leche', cover: 'f4754e9ebc78f9b43a3e9c2b0c6dca47', g: ['f6cabcd975afd9daf4ff1b37ec7dab74', '87a7e6ee329bf05d70149aa02d8c3460', '5fef375acd15097241577b905d2758bf'],
        note: 'Sabor a caramelo, leve acidez y aromas tostados.',
        desc: ['Nació de un reto de nuestros pasteleros y de la demanda de nuestros clientes.', 'Sutil sabor a caramelo y color avellanado, con una leve acidez y aromas tostados.'],
        sizes: [[M8, 35]] },
      { id: 'oreo', name: 'Oreo', cover: 'ee7f888bfb7f4bb0198e1d8d300cffd5', g: ['0f5ea7843596eb252bbc2ad81296cf19', '17bfbdd342248e032947491ab9a47c02', '8c3613877ea25fe8d4a4ab05226889ac'],
        note: 'Base de galleta Oreo y relleno con trozos de Oreo.',
        desc: ['No podía faltar la tarta de queso con la galleta más vendida.', 'Una base de galleta Oreo con un ligero sabor a chocolate y un relleno de nuestros quesos con crema y trozos de Oreo.'],
        sizes: [[M8, 35]] },
      { id: 'lotus', name: 'Galleta Lotus', cover: '4b73452cd92f279aef67d91cebcc0870', g: ['02432b97b3eace3507968ffa83b9352d', '3d79b59484bd45c98f331ce99ef25395', '614c8cd37ab981d2db7e0377d9294712'],
        note: 'Nuestra tarta de queso con el sabor de la galleta Lotus.',
        desc: ['La tradición de la tarta de queso vasca con el sabor característico de la galleta Lotus.'],
        sizes: [[M8, 35]] },
      { id: 'happyhippo', name: 'Happy Hippo', cover: '28dd979d083f3ca844fe6148192827dd', g: ['84fd2340260b1ffabb849e778e39a1ce', '0d660c747be67a4e631c8b686dfe06bb', 'becd81e79f2071f0705e1c3d707b43da'],
        note: 'Con Kinder Happy Hippo y praliné de avellana sobre base tostada.',
        desc: ['Una de nuestras creaciones más divertidas: tarta de queso al estilo vasco con auténticos Kinder Happy Hippo.', 'Su base tostada de galleta y mantequilla sostiene un manto de queso cremoso fusionado con praliné de avellana. Un viaje a la infancia, sin renunciar a la sofisticación.'],
        sizes: [[M8, 35]] }
    ];
    const NOOR = { id: 'noor', name: 'Alex Cordobes × Noor', cover: 'fa368ee77685b0f17338b5956c36412e', sizes: [['Edición limitada', 50]] };
    const byId = {};
    CAKES.concat([NOOR]).forEach((c) => { byId[c.id] = c; });
    const priceLabel = (c) => {
      const p = c.sizes.map((z) => z[1]);
      return p.length > 1 ? euro(Math.min.apply(null, p)) + ' – ' + euro(Math.max.apply(null, p)) : euro(p[0]);
    };

    const addKey = (key, open) => {
      const cart = Object.assign({}, this.state.cart);
      cart[key] = (cart[key] || 0) + 1;
      this.setState({ cart: cart, drawer: open !== false });
    };
    const removeKey = (key) => {
      const cart = Object.assign({}, this.state.cart);
      cart[key] = (cart[key] || 0) - 1;
      if (cart[key] <= 0) delete cart[key];
      this.setState({ cart: cart });
    };

    const cakes = CAKES.map((c) => ({
      id: 'tarta-' + c.id, name: c.name, note: c.note, priceLabel: priceLabel(c),
      cover: B(c.cover), top: B(c.g[2]), alt: 'Tarta de queso ' + c.name,
      open: nav('tarta', { cake: c.id })
    }));

    const PANEL = {
      tradicional: { kicker: 'La original', badge: 'Horneada cada día', bg: '#7A4A26', rim: '#4E2810', dark: true },
      pistacho: { kicker: 'La más atrevida', badge: 'Crujiente de pistacho', bg: '#56632A', rim: '#6E4A1E', dark: true },
      belga: { kicker: 'Para los amantes del chocolate', badge: 'Negro y con leche', bg: '#4A2A22', rim: '#2E1711', dark: true },
      blanco: { kicker: 'La más gamberra', badge: 'Manteca de cacao', bg: '#EDE6D6', rim: '#B98447', dark: false },
      dulce: { kicker: 'Nacida de un reto', badge: 'Aromas tostados', bg: '#8A4F22', rim: '#5E3112', dark: true },
      oreo: { kicker: 'Con la galleta más vendida', badge: 'Base de Oreo', bg: '#262830', rim: '#5B5E6B', dark: true },
      lotus: { kicker: 'Tradición vasca y Lotus', badge: 'Sabor Lotus', bg: '#9C4328', rim: '#6A2A16', dark: true },
      happyhippo: { kicker: 'Un viaje a la infancia', badge: 'Praliné de avellana', bg: '#6A503E', rim: '#8A6A48', dark: true }
    };
    const SLICE = { tradicional: 'b11ecc6ac35ea20cf22932c8fb9a3c55', pistacho: 'c70c1a526a3b4dd9b0cd1ed24d713cd4', belga: '72c42decf5718ee524606326ee20716b', blanco: '48cc6fad44426de248a79cb60f636aad', dulce: 'a8ef2c2a8b25f6f7365da88d704acc05', oreo: 'b8f230921f0eafe1e39b366e648b9031', lotus: '05169b11c14c197e5dd4998abf63f4d7', happyhippo: 'e56a239edcb8365ec5cfcb1ac3d58610' };
    const DISC = { tradicional: '5772fe66814e6cd4a46ee1637073cb01', pistacho: '62d0dd2ef2a908fd477a24d61eee990b', belga: '465ac0f70c37637e200a526dabfb3942', blanco: 'b5b01f622ae5c74a7d54c3bf79b8e5f1', dulce: '7b7709fb9a19ca37380916aaeca63396', oreo: '10d9434f14b65c9e38345a650ba8f74f', lotus: '7dc0164463e4872fd68d8ac9b8940fee', happyhippo: 'c86f98d52443054ce0391c847c9c7623' };
    const ORDER = ['tradicional', 'pistacho', 'belga', 'blanco', 'dulce', 'oreo', 'lotus', 'happyhippo'];
    const panels = ORDER.map((k) => {
      const c = byId[k];
      const P = PANEL[k];
      const d = P.dark;
      return {
        id: 'tarta-' + k, name: c.name, word: c.name, kicker: P.kicker, badge: P.badge, lead: c.note, priceLabel: priceLabel(c),
        slice: B(SLICE[k]), disc: B(DISC[k]), alt: 'Porción de tarta de queso ' + c.name,
        bg: P.bg, rim: P.rim,
        fg: d ? '#F6F0E4' : '#2A2420', muted: d ? '#E6DCCB' : '#5A5048', accent: d ? '#F1DDAE' : '#8C5A2B',
        stroke: d ? 'rgba(246,240,228,.24)' : 'rgba(42,36,32,.18)',
        stkBg: d ? '#F1DDAE' : '#2A2420', stkFg: d ? '#222126' : '#EDE6D6',
        btnBg: d ? '#F1DDAE' : '#2A2420', btnFg: d ? '#222126' : '#F6F0E4',
        open: nav('tarta', { cake: k }),
        add: () => addKey(k + '|0')
      };
    });

    // ---------- Ficha ----------
    const cc = byId[S.cake] && S.cake !== 'noor' ? byId[S.cake] : CAKES[0];
    const imgs = [cc.cover].concat(cc.g);
    const si = S.sizes[cc.id] || 0;
    const curKey = cc.id + '|' + si;
    const curIn = S.cart[curKey] || 0;
    const INFO = [
      ['Alérgenos', 'Los principales alérgenos de nuestras tartas son gluten, lácteos, huevo, frutos secos, soja y sulfitos. No son aptas para celíacos y no hay versión sin lactosa ni sin azúcar. El detalle de esta tarta está en su ficha técnica.'],
      ['Conservación', 'Hasta 5 días en nevera, aunque está mejor cuanto antes. No debe pasar más de 2 horas fuera del frío: en trayectos largos, bolsa isotérmica y siempre en horizontal.'],
      ['Recogida', 'Reserva con 48 horas como mínimo y hasta 28 días antes. Recógela el día elegido en el horario de tu tienda, sin hacer cola. Si no se recoge ese día, no se guarda.']
    ];
    const cur = {
      name: cc.name,
      price: cc.sizes.length > 1 ? euro(cc.sizes[si][1]) : euro(cc.sizes[0][1]),
      desc: cc.desc,
      gallery: imgs.map((id, i) => ({
        src: B(id), n: i + 1, alt: 'Tarta de queso ' + cc.name + ', foto ' + (i + 1),
        opacity: i === S.gi ? 1 : 0, scale: i === S.gi ? 1 : 1.04,
        pressed: i === S.gi ? 'true' : 'false', border: i === S.gi ? '#E6CF9C' : 'transparent', thumbOpacity: i === S.gi ? 1 : 0.6,
        pick: () => this.setState({ gi: i })
      })),
      sizes: cc.sizes.map((z, i) => {
        const on = i === si;
        return { label: z[0], pressed: on ? 'true' : 'false', bg: on ? '#F3EFE6' : 'transparent', fg: on ? '#222126' : '#F3EFE6', border: on ? '#F3EFE6' : '#6C6A73',
          pick: () => { const sz = Object.assign({}, this.state.sizes); sz[cc.id] = i; this.setState({ sizes: sz }); } };
      }),
      addLabel: curIn ? 'Añadida (' + curIn + ') · añadir otra' : 'Añadir a la reserva',
      add: () => addKey(curKey),
      info: INFO.map((x, i) => ({ t: x[0], b: x[1], open: S.info === i, rot: S.info === i ? 45 : 0,
        toggle: () => this.setState({ info: this.state.info === i ? null : i }) }))
    };
    const ci = CAKES.indexOf(cc);
    const related = [1, 2, 3, 4].map((k) => CAKES[(ci + k) % CAKES.length]).map((c) => ({
      id: 'tarta-' + c.id, name: c.name, priceLabel: priceLabel(c), cover: B(c.cover), top: B(c.g[2]), alt: 'Tarta de queso ' + c.name,
      open: nav('tarta', { cake: c.id })
    }));

    // ---------- Tiendas y horarios ----------
    const vel = [[600, 1260]];
    const roz = [[600, 840], [960, 1200]];
    const STORES = {
      vel: { name: 'Velázquez', short: 'Martes a sábado, de 10:00 a 21:00',
        hours: { 0: [[600, 840]], 1: [], 2: vel, 3: vel, 4: vel, 5: vel, 6: vel },
        address: 'Velázquez, 60 (junto al Hotel Bless) · 28001 Madrid', extra: 'Metro Velázquez y Serrano (L4)',
        maps: 'https://www.google.com/maps/search/?api=1&query=Alex+Cordobes+Velazquez+60+Madrid',
        rows: [['Martes a sábado', '10:00 – 21:00'], ['Domingo', '10:00 – 14:00'], ['Lunes', 'Cerrado']] },
      roz: { name: 'Las Rozas', short: 'Martes a sábado, de 10:00 a 14:00 y de 16:00 a 20:00',
        hours: { 0: [[600, 840]], 1: [], 2: roz, 3: roz, 4: roz, 5: roz, 6: roz },
        address: 'C/ Comunidad de Madrid, 41 · C.C. Burgocentro I, local 108 · 28231 Las Rozas', extra: 'Dentro del centro comercial Burgocentro I',
        maps: 'https://www.google.com/maps/search/?api=1&query=Alex+Cordobes+Burgocentro+Las+Rozas',
        rows: [['Martes a sábado', '10:00 – 14:00 y 16:00 – 20:00'], ['Domingo', '10:00 – 14:00'], ['Lunes', 'Cerrado']] }
    };
    const fmt = (m) => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
    const rangeText = (r) => r.map((x) => fmt(x[0]) + ' a ' + fmt(x[1])).join(' y de ');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const statusFor = (s) => {
      const r = s.hours[now.getDay()];
      for (let i = 0; i < r.length; i++) if (nowMin >= r[i][0] && nowMin < r[i][1]) return { open: true, text: 'Abierta ahora · cierra a las ' + fmt(r[i][1]) };
      for (let i = 0; i < r.length; i++) if (nowMin < r[i][0]) return { open: false, text: 'Cerrada ahora · abre hoy a las ' + fmt(r[i][0]) };
      for (let k = 1; k <= 7; k++) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + k);
        const rr = s.hours[d.getDay()];
        if (rr.length) return { open: false, text: 'Cerrada ahora · abre ' + (k === 1 ? 'mañana' : 'el ' + DOW[d.getDay()]) + ' a las ' + fmt(rr[0][0]) };
      }
      return { open: false, text: 'Cerrada' };
    };
    const dw = now.getDay();
    const todayRow = dw === 1 ? 2 : (dw === 0 ? 1 : 0);
    const storeCards = ['vel', 'roz'].map((k) => {
      const s = STORES[k];
      const st = statusFor(s);
      return { name: s.name, address: s.address, extra: s.extra, maps: s.maps, status: st.text, statusColor: st.open ? '#2F6B3A' : '#8C3F1C',
        rows: s.rows.map((r, i) => ({ days: r[0] + (i === todayRow ? ' · hoy' : ''), hours: r[1], weight: i === todayRow ? 500 : 300 })),
        reserve: () => this.go('reserva', { store: k }) };
    });

    // ---------- Reserva: días ----------
    const count = S.showAll ? 27 : 14;
    const all = [];
    for (let i = 2; i < 2 + count; i++) all.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));
    const first = all.find((d) => d.getDay() !== 1);
    const selIso = S.dayIso || (first ? this.iso(first) : null);
    const store = STORES[S.store];
    const days = all.map((d) => {
      const iso = this.iso(d);
      const closed = d.getDay() === 1;
      const sel = iso === selIso;
      return { dow: DOWS[d.getDay()], num: d.getDate(), sub: closed ? 'cerrado' : (d.getDay() === 0 ? 'mañana' : MONS[d.getMonth()]), closed: closed,
        pressed: sel ? 'true' : 'false', aria: DOW[d.getDay()] + ' ' + d.getDate() + ' de ' + MON[d.getMonth()] + (closed ? ', cerrado' : ''),
        cursor: closed ? 'not-allowed' : 'pointer', bg: sel ? '#E6CF9C' : 'transparent', fg: sel ? '#222126' : (closed ? '#8F8B95' : '#F3EFE6'),
        border: sel ? '#E6CF9C' : (closed ? '#4A4950' : '#6C6A73'), pick: () => { if (!closed) this.setState({ dayIso: iso }); } };
    });
    let pickupSentence = 'Elige un día para ver el horario de recogida.';
    let pickupShort = '';
    if (selIso) {
      const p = selIso.split('-');
      const sd = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      const when = DOW[sd.getDay()] + ' ' + sd.getDate() + ' de ' + MON[sd.getMonth()];
      const rt = rangeText(store.hours[sd.getDay()]);
      pickupSentence = 'Recoges el ' + when + ' en ' + store.name + ', de ' + rt + '.';
      pickupShort = 'Recogida el ' + when + ' en ' + store.name + ', de ' + rt;
    }
    const stores = ['vel', 'roz'].map((k) => {
      const on = S.store === k;
      return { name: STORES[k].name, short: STORES[k].short, pressed: on ? 'true' : 'false', bg: on ? '#E6CF9C' : 'transparent', fg: on ? '#222126' : '#F3EFE6', border: on ? '#E6CF9C' : '#6C6A73',
        pick: () => this.setState({ store: k }) };
    });

    // ---------- Cesta ----------
    let total = 0;
    let units = 0;
    const keys = Object.keys(S.cart);
    const lines = keys.map((key) => {
      const parts = key.split('|');
      const c = byId[parts[0]];
      const z = c.sizes[Number(parts[1])];
      const q = S.cart[key];
      total += z[1] * q;
      units += q;
      return { qty: q, name: c.name, size: z[0], subtotal: euro(z[1] * q), img: B(c.cover),
        minusAria: 'Quitar una ' + c.name, plusAria: 'Añadir otra ' + c.name,
        remove: () => removeKey(key), addOne: () => addKey(key, false) };
    });
    const hasNoor = keys.some((k) => k.indexOf('noor|') === 0);
    const noorIn = S.cart['noor|0'] || 0;

    // ---------- Contenido ----------
    const press = [
      { outlet: 'El País', detail: '“La tarta de queso con lista de espera”, 2021', url: 'https://elpais.com/espana/madrid/2021-09-24/la-tarta-de-queso-con-lista-de-espera.html' },
      { outlet: 'El Mundo', detail: 'Metrópoli, 2024', url: 'https://www.elmundo.es/metropoli/gourmet/2024/02/20/65c9e338e9cf4a60478b4593.html' },
      { outlet: 'El Español', detail: 'Reportaje, 2022', url: 'https://www.elespanol.com/reportajes/20221218/alex-cordobes-cocinar-garaje-padres-madrid-eur/726177763_0.html' },
      { outlet: 'Expansión', detail: 'Fuera de Serie, 2021', url: 'https://www.expansion.com/fueradeserie/gastro/2021/07/29/6101485f468aeb59208b469e.html' },
      { outlet: 'Marca', detail: 'Tiramillas, 2022', url: 'https://amp.marca.com/tiramillas/gastronomia/2022/03/16/62321dc2ca4741cf168b45e2.html' },
      { outlet: 'Condé Nast Traveler', detail: 'Gastronomía', url: 'https://www.traveler.es/gastronomia/articulos/tarta-de-queso-madrid-por-encargo-alex-cordobes-instagram-alexcordobess/18739' }
    ];
    const outlets = press.map((p) => p.outlet);
    const marquee = outlets.concat(outlets).concat(outlets).concat(outlets);

    const noorParts = [
      { t: 'Tartaleta', img: B('9e25e4438fce2ad67378855cbdc253e6'), alt: 'Tartaleta de cítricos de la edición Noor', dir: 'row',
        lines: ['Sablée con macedonia de cítricos, reducción de naranja, labneh cremoso y gel de lima, mandarina y naranja sanguina, con hierbabuena fresca y brotes de mandarina.'] },
      { t: 'Tarta', img: B('adefd8c6be788588065738fea7f2f0e7'), alt: 'Tarta de queso y ajonjolí de la edición Noor', dir: 'row-reverse',
        lines: ['Tarta de queso y ajonjolí sobre base de galleta y mantequilla tostada, con toffee de sésamo blanco y un crujiente caramelizado de sésamo.', 'Se acompaña de una pipeta de algarroba para dosificar al gusto.'] },
      { t: 'Petit fours', img: B('85a54206563876121c5dd273627f7461'), alt: 'Gominola de limón y clavo de la edición Noor', dir: 'row',
        lines: ['Choux de hierba luisa y pistacho. Gominola de limón y clavo. Bombón de loomi. Bombón de gianduja de avellana.'] }
    ];

    const FAQ = [
      ['¿Puedo comprar sin reservar?', 'Sí, en cualquiera de las dos tiendas, esperando tu turno. Con reserva vas directo al mostrador. Las tartas pequeñas solo se venden así, en tienda.'],
      ['¿Con cuánta antelación tengo que reservar?', 'Con 48 horas como mínimo y hasta 28 días antes, en la web o en tienda. No se reserva por teléfono.'],
      ['¿Hacéis envíos a domicilio?', 'No. Son tartas muy delicadas que necesitan frío, y el transporte las estropea. Solo se recogen en tienda.'],
      ['¿Puedo cambiar el día o anular mi reserva?', 'Sí, con al menos 48 horas de antelación, llamando al 900 999 159 o escribiendo a info@alexcordobes.es con tu número de pedido. Sin ese aviso no se aceptan cambios ni devoluciones.'],
      ['¿Puede recogerla otra persona?', 'Sí, solo necesita el número de pedido.'],
      ['¿Cuánto dura la tarta y cómo la conservo?', 'Hasta 5 días en la nevera, aunque está mejor cuanto antes. No debe pasar más de 2 horas fuera del frío: en trayectos largos, bolsa isotérmica y siempre en horizontal.'],
      ['¿Son aptas para celíacos, o sin lactosa o sin azúcar?', 'No. Los principales alérgenos de nuestras tartas son gluten, lácteos, huevo, frutos secos, soja y sulfitos. Cada tarta tiene su ficha de alérgenos.'],
      ['¿Hacéis tartas personalizadas o pedidos para eventos?', 'No personalizamos las tartas. Para eventos y pedidos especiales, escríbenos a info@alexcordobes.es.']
    ];
    const faqs = FAQ.map((f, i) => ({ q: f[0], a: f[1], open: S.faq === i, rot: S.faq === i ? 45 : 0,
      toggle: () => this.setState({ faq: this.state.faq === i ? null : i }) }));

    const NAV = [['tartas', 'Tartas', 'carta'], ['noor', 'Edición Noor', 'noor'], ['tiendas', 'Tiendas', 'tiendas'], ['historia', 'Historia', 'historia'], ['preguntas', 'Preguntas', 'preguntas']];
    const curPage = S.page === 'tarta' ? 'carta' : S.page;
    const navItems = NAV.map((n) => ({ id: n[0], label: n[1], go: nav(n[2]), current: curPage === n[2] ? 'page' : 'false', color: curPage === n[2] ? '#E6CF9C' : '#F3EFE6' }));
    const navMobile = [['inicio', 'Inicio', 'home']].concat(NAV).concat([['reserva', 'Mi reserva', 'reserva']]).map((n, i) => ({ id: n[0], label: n[1], go: nav(n[2]), delay: (0.08 + i * 0.06).toFixed(2) + 's' }));

    return {
      isHome: S.page === 'home', isCarta: S.page === 'carta', isTarta: S.page === 'tarta', isNoor: S.page === 'noor',
      isTiendas: S.page === 'tiendas', isHistoria: S.page === 'historia', isPreguntas: S.page === 'preguntas', isReserva: S.page === 'reserva',
      hdrBg: S.page === 'home' || S.page === 'noor' ? 'rgba(31,30,34,0)' : 'rgba(31,30,34,.94)',
      hdrClass: S.page === 'home' || S.page === 'noor' ? 'hdr' : '',
      nav: navItems, navMobile: navMobile, menuOpen: S.menu,
      toggleMenu: () => this.setState({ menu: !this.state.menu }),
      goHome: nav('home'), goCarta: nav('carta'), goNoor: nav('noor'), goTiendas: nav('tiendas'), goReserva: nav('reserva'),
      panels: panels, cakes: cakes, cur: cur, related: related, noorParts: noorParts,
      storeCards: storeCards, stores: stores, days: days,
      moreDaysLabel: S.showAll ? 'Ver menos fechas' : 'Ver más fechas',
      toggleMoreDays: () => this.setState({ showAll: !this.state.showAll }),
      pickupSentence: pickupSentence, pickupShort: pickupShort,
      lines: lines, units: units, total: euro(total), hasItems: units > 0, noItems: units === 0,
      bagAria: units > 0 ? 'Ver tu reserva, ' + units + ' tartas' : 'Ver tu reserva',
      noorConflict: hasNoor && !(S.store === 'vel' && selIso === NOOR_ISO),
      noorLabel: noorIn ? 'Añadida (' + noorIn + ') · añadir otra' : 'Reservar para el 10 de octubre',
      addNoor: () => { const cart = Object.assign({}, this.state.cart); cart['noor|0'] = (cart['noor|0'] || 0) + 1; this.setState({ cart: cart, store: 'vel', dayIso: NOOR_ISO, drawer: true }); },
      drawerOpen: S.drawer, openDrawer: () => this.setState({ drawer: true }), closeDrawer: () => this.setState({ drawer: false }),
      press: press, marquee: marquee, faqs: faqs,
      showCookies: S.cookies === 'pending',
      acceptCookies: () => this.setState({ cookies: 'ok' }), rejectCookies: () => this.setState({ cookies: 'no' })
    };
  }
}
