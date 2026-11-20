/* KLAK 3D keyboard v3 (оптимизированная).
   Вся клавиатура представляет собой ОДНУ наклонённую плоскость. Высота клавиш, стенки корпуса и цилиндр энкодера
   нарисованы многослойным box-shadow, смещённым туда, куда на экране «уходит» глубина.
   Браузеру не нужно сортировать сотни 3D-плоскостей: слой рисуется один раз,
   а при нажатии перерисовывается только одна клавиша.
   Форматы: 65 / 75 / tkl / full. Режим caps:false показывает клавиатуру без кейкапов (видны свитчи). */
(function () {
  const R = (w, l, role, h) => [w, l, role, h || 1];
  const GAP = (w) => [w, null];
  const F_ROW = [R(1, 'esc', 'acc'), GAP(0.25), R(1, 'F1'), R(1, 'F2'), R(1, 'F3'), R(1, 'F4'), GAP(0.25), R(1, 'F5'), R(1, 'F6'), R(1, 'F7'), R(1, 'F8'), GAP(0.25), R(1, 'F9'), R(1, 'F10'), R(1, 'F11'), R(1, 'F12')];
  const ALPHA = [
    [R(1, '~'), R(1, '1'), R(1, '2'), R(1, '3'), R(1, '4'), R(1, '5'), R(1, '6'), R(1, '7'), R(1, '8'), R(1, '9'), R(1, '0'), R(1, '-'), R(1, '='), R(2, '⌫', 'mod')],
    [R(1.5, 'tab', 'mod'), R(1, 'Q'), R(1, 'W'), R(1, 'E'), R(1, 'R'), R(1, 'T'), R(1, 'Y'), R(1, 'U'), R(1, 'I'), R(1, 'O'), R(1, 'P'), R(1, '['), R(1, ']'), R(1.5, '\\', 'mod')],
    [R(1.75, 'caps', 'mod'), R(1, 'A'), R(1, 'S'), R(1, 'D'), R(1, 'F'), R(1, 'G'), R(1, 'H'), R(1, 'J'), R(1, 'K'), R(1, 'L'), R(1, ';'), R(1, "'"), R(2.25, 'enter', 'acc')],
    [R(2.25, 'shift', 'mod'), R(1, 'Z'), R(1, 'X'), R(1, 'C'), R(1, 'V'), R(1, 'B'), R(1, 'N'), R(1, 'M'), R(1, ','), R(1, '.'), R(1, '/'), R(1.75, 'shift', 'mod')],
    [R(1.25, 'ctrl', 'mod'), R(1.25, 'win', 'mod'), R(1.25, 'alt', 'mod'), R(6.25, '', 'acc'), R(1.25, 'alt', 'mod'), R(1.25, 'fn', 'mod'), R(1.25, 'ctrl', 'mod')]
  ];
  const M = 'mod';

  function layout(name) {
    if (name === '65') {
      const right = [[R(1, 'del', M)], [R(1, 'pgup', M)], [R(1, 'pgdn', M)], [R(1, '↑', M), R(1, 'end', M)], [R(1, '←', M), R(1, '↓', M), R(1, '→', M)]];
      const rows = ALPHA.map((r, i) => {
        let keys = [...r];
        if (i === 3) keys = keys.slice(0, -1).concat([R(1.75, 'shift', M)]);
        if (i === 4) keys = [R(1.25, 'ctrl', M), R(1.25, 'win', M), R(1.25, 'alt', M), R(6.25, '', 'acc'), R(1, 'alt', M), R(1, 'fn', M)];
        return { y: i, keys: keys.concat(right[i]) };
      });
      return { rows, knob: false };
    }
    if (name === '75') {
      const right = [[R(1, 'pgup', M)], [R(1, 'pgdn', M)], [R(1, 'home', M)], [R(1, '↑', M), R(1, 'end', M)], [R(1, '←', M), R(1, '↓', M), R(1, '→', M)]];
      const rows = [{ y: 0, keys: [...F_ROW, GAP(0.25), R(1, 'del', M)], knob: true }];
      ALPHA.forEach((r, i) => {
        let keys = [...r];
        if (i === 3) keys = keys.slice(0, -1).concat([R(1.75, 'shift', M)]);
        if (i === 4) keys = [R(1.25, 'ctrl', M), R(1.25, 'win', M), R(1.25, 'alt', M), R(6.25, '', 'acc'), R(1, 'alt', M), R(1, 'fn', M), R(1, 'ctrl', M)];
        rows.push({ y: i + 1.25, keys: keys.concat(right[i]) });
      });
      return { rows, knob: true };
    }
    // TKL / Full: отдельный блок навигации, у Full ещё и цифровой блок
    const rows = [{ y: 0, keys: [...F_ROW, GAP(0.25), R(1, 'prt', M), R(1, 'scr', M), R(1, 'pse', M)] }];
    const nav = [[R(1, 'ins', M), R(1, 'home', M), R(1, 'pgup', M)], [R(1, 'del', M), R(1, 'end', M), R(1, 'pgdn', M)], [GAP(3)], [GAP(1), R(1, '↑', M), GAP(1)], [R(1, '←', M), R(1, '↓', M), R(1, '→', M)]];
    const pad = [[R(1, 'num', M), R(1, '/', M), R(1, '*', M), R(1, '-', M)], [R(1, '7'), R(1, '8'), R(1, '9'), R(1, '+', M, 2)], [R(1, '4'), R(1, '5'), R(1, '6'), GAP(1)], [R(1, '1'), R(1, '2'), R(1, '3'), R(1, '↵', 'acc', 2)], [R(2, '0'), R(1, '.'), GAP(1)]];
    ALPHA.forEach((r, i) => {
      const keys = [...r, GAP(0.25), ...nav[i]];
      if (name === 'full') keys.push(GAP(0.25), ...pad[i]);
      rows.push({ y: i + 1.25, keys });
    });
    return { rows, knob: false };
  }

  // профиль OEM: высота колпачка по рядам
  const ROW_H = [1.15, 1.08, 1.0, 0.94, 0.98, 1.02];
  // куда на экране уходит «вниз по высоте» при наклоне rotateX(54deg) rotateZ(-24deg)
  const EX = { x: -0.56, y: 1.26 };

  const mix = (a, b, t) => {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const c = [16, 8, 0].map((s) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t));
    return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
  };

  function skirt(h, color) {
    const layers = [];
    const steps = Math.max(2, Math.round(h));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      layers.push(`${(EX.x * i).toFixed(2)}px ${(EX.y * i).toFixed(2)}px 0 ${(t * 0.7).toFixed(2)}px ${mix(color, '#000000', (i === 1 ? 0.38 : 0.42) + t * 0.33)}`);
    }
    layers.push(`${(EX.x * (steps + 1.5)).toFixed(1)}px ${(EX.y * (steps + 1.5)).toFixed(1)}px 4px 1px rgba(0,0,0,.6)`);
    return layers.join(',');
  }

  function walls(h, color, soft = true) {
    const layers = [];
    for (let i = 1; i <= h; i++) layers.push(`${(EX.x * i).toFixed(2)}px ${(EX.y * i).toFixed(2)}px 0 0 ${mix(color, '#000000', 0.25 + (i / h) * 0.45)}`);
    if (soft) layers.push(`${(EX.x * h * 1.3).toFixed(1)}px ${(EX.y * h * 1.3).toFixed(1)}px 40px 6px rgba(0,0,0,.7)`);
    return layers.join(',');
  }

  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

  const DEFAULTS = {
    case: '#2b2e33', caseStyle: 'alu', plate: '#0e0f11', cap: '#3a3d44', mod: '#2d3036', acc: '#c8ff3d',
    lg: '#b7bcae', lgMod: '#8d9288', lgAcc: '#1b2406', knob: '#34373d', knobRing: '#8a8f98',
    u: 33, kh: 12, caps: true, stem: '#c8ff3d', housing: '#25272c', shadow: true
  };

  let uid = 0;
  function build(root, opts = {}) {
    const t = Object.assign({}, DEFAULTS, opts.theme || {});
    const { rows, knob } = layout(opts.layout || '75');
    const id = root.dataset.kb3 || (root.dataset.kb3 = 'kb' + (++uid));
    root.className = `kb3 kb3--${t.caseStyle}` + (t.caps ? '' : ' kb3--nocaps');
    root.replaceChildren();
    const u = t.u, gap = Math.max(2, u * 0.09), pad = u * 0.55;
    root.style.setProperty('--u', u + 'px');
    root.style.setProperty('--gap', gap + 'px');
    const sel = `.kb3[data-kb3="${id}"]`;

    // тени генерируем один раз под каждую комбинацию «роль × ряд»
    const css = [];
    const roles = t.caps ? { cap: t.cap, mod: t.mod, acc: t.acc } : { cap: t.housing, mod: t.housing, acc: t.housing };
    Object.entries(roles).forEach(([role, color]) => {
      ROW_H.forEach((k, r) => {
        const h = t.caps ? t.kh * k : t.kh * 0.45;
        css.push(`${sel} .k3--${role}.k3--r${r}{--sk:${skirt(h, color)};--skp:${skirt(h * 0.4, color)};--pdx:${(-EX.x * h * 0.6).toFixed(2)}px;--pdy:${(-EX.y * h * 0.6).toFixed(2)}px}`);
      });
    });
    const style = el('style');
    style.textContent = css.join('\n') +
      `\n${sel}{--cap:${t.cap};--mod:${t.mod};--acc:${t.acc};--lg:${t.lg};--lg-mod:${t.lgMod};--lg-acc:${t.lgAcc};--stem:${t.stem};--housing:${t.housing}}` +
      `\n${sel} .kb3__case{box-shadow:${walls(Math.round(t.kh * 2.3), t.case, t.shadow)}}` +
      `\n${sel} .kb3__knob{box-shadow:${walls(Math.round(t.kh * 1.2), t.knob, false)}}`;
    root.append(style);

    const caseEl = el('div', 'kb3__case');
    caseEl.style.setProperty('--case', t.case);
    const plate = el('div', 'kb3__plate');
    plate.style.background = t.plate;
    caseEl.append(plate);
    const keysBox = el('div', 'kb3__keys');
    let maxX = 0, maxY = 0;
    rows.forEach((row, ri) => {
      let x = 0;
      const rowEls = [];
      row.keys.forEach(([w, label, role, h]) => {
        if (label === null) { x += w; return; }
        const k = el('span', `k3 k3--${role || 'cap'} k3--r${ri}`);
        k.style.cssText = `left:calc(${x}*var(--u));top:calc(${row.y}*var(--u));width:calc(${w}*var(--u) - var(--gap));height:calc(${h}*var(--u) - var(--gap))`;
        k.dataset.label = (label || '').toLowerCase();
        if (label && t.caps) { k.dataset.l = label; if (label.length > 2) k.classList.add('k3--sm'); }
        rowEls.push(k);
        maxY = Math.max(maxY, row.y + h);
        x += w;
      });
      // «юбки» уходят влево-вниз, поэтому в ряду рисуем справа налево
      if (row.knob && knob) {
        const kn = el('span', 'kb3__knob');
        kn.style.cssText = `left:calc(${x + 0.3}*var(--u));top:calc(${row.y}*var(--u));--knob:${t.knob};--ring:${t.knobRing};--dot:${t.acc}`;
        keysBox.append(kn);
        x += 1.3;
      }
      rowEls.reverse().forEach((k) => keysBox.append(k));
      maxX = Math.max(maxX, x);
    });
    root.style.width = (maxX * u - gap + pad * 2) + 'px';
    root.style.height = (maxY * u - gap + pad * 2) + 'px';
    keysBox.style.inset = pad + 'px';
    plate.style.inset = (pad - 4) + 'px';
    caseEl.append(el('i', 'kb3__badge'));
    root.append(caseEl, keysBox);
    return root;
  }

  window.KlakKeyboard3 = { build };
})();
