const STORAGE_KEY = "note-workflow-app-v1";

const seedItems = [
  {
    id: crypto.randomUUID(),
    title: "『今日のClaudeなんか変』は気のせいじゃなかった",
    account: "moco_edu_note",
    type: "draft",
    status: "Polishing",
    priority: "Medium",
    due: "違和感が言語化できたら今週",
    summary: "Claudeの出力が妙にズレる日がある体感を、使う側の注意点に落としたい。",
    nextAction: "現象の具体例を2つだけ足して、読者が再現できる見方にする。",
    concerns: "体感だけで終わると弱い。愚痴っぽくしない。",
    targetAi: "Claude",
    aiGoal: "clarity-pass",
    source: "自分の利用メモ。教育文脈にも触れたい。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "中学受験の算数に強いAIはどれ？ 無料版・有料版を比較",
    account: "moco_edu_note",
    type: "comparison",
    status: "Ready",
    priority: "High",
    due: "画像整理が終わったら公開",
    summary: "本文はほぼ形になっていて、国語記事と同じ流れで整っている。",
    nextAction: "画像の順番とキャプションを整えて公開準備。",
    concerns: "結論が長くなりすぎないようにする。",
    targetAi: "ChatGPT",
    aiGoal: "humanize-pass",
    source: "算数データあり。国語記事と同型。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "理科で使いやすいAI比較",
    account: "moco_edu_note",
    type: "comparison",
    status: "Drafting",
    priority: "High",
    due: "理科データ整理後",
    summary: "実験考察・知識問題・計算問題のデータはあるが、まだ表に落としていない。",
    nextAction: "問題タイプ別に、正答率と解説の質を整理する。",
    concerns: "実験問題で何を評価軸にするかを固定したい。",
    targetAi: "ChatGPT",
    aiGoal: "comparison-pass",
    source: "理科総合データ、スクショあり。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "社会で使いやすいAI比較",
    account: "moco_edu_note",
    type: "comparison",
    status: "Drafting",
    priority: "High",
    due: "社会データ整理後",
    summary: "資料読み取りと記述の比較材料はあるが、記事にする前の整理がまだ。",
    nextAction: "資料読み取り、地理、歴史記述の3区分で要点を並べる。",
    concerns: "単なる正誤だけでなく、学習用途としての相性を書く。",
    targetAi: "Claude",
    aiGoal: "comparison-pass",
    source: "社会総合データ、総合問題との接続あり。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "総合問題で見えるAIの差",
    account: "moco_edu_note",
    type: "comparison",
    status: "Idea",
    priority: "Medium",
    due: "理社整理のあと",
    summary: "総合問題のデータはある。個別教科が揃ったあとに総まとめとして出したい。",
    nextAction: "総合問題をどのタイミングで公開するか決める。",
    concerns: "単独記事にするか、総まとめに吸収するか迷う。",
    targetAi: "ChatGPT",
    aiGoal: "comparison-pass",
    source: "理科・社会横断の材料として使う。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "『学問のすゝめ』 第七編④『マルチドム』という言葉…",
    account: "moco_edu_note",
    type: "draft",
    status: "Idea",
    priority: "Low",
    due: "比較記事の谷間で進める",
    summary: "教育エッセイとして連載の続きを作る枠。",
    nextAction: "今回の中心メッセージを一文で先に固定する。",
    concerns: "抽象に寄りすぎない。",
    targetAi: "ChatGPT",
    aiGoal: "first-draft",
    source: "連載下書き。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "『お金のためじゃない』は美徳ではない。稼げない会社が…",
    account: "learnfromfailure",
    type: "draft",
    status: "Polishing",
    priority: "High",
    due: "今月中",
    summary: "価値観の話として強いが、断定が強すぎる部分がある。",
    nextAction: "読者が反発しやすい箇所に補助線を引く。",
    concerns: "正論の押しつけに見えないようにする。",
    targetAi: "Claude",
    aiGoal: "opinion-pass",
    source: "下書きあり。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "『誰に売るか』は、『何を売るか』より先に決まっている",
    account: "learnfromfailure",
    type: "rewrite",
    status: "Rewrite",
    priority: "Medium",
    due: "旧記事の更新候補",
    summary: "既存の主張を残しつつ、今の言葉に寄せてリライトしたい。",
    nextAction: "冒頭で結論を先に出す構成に組み替える。",
    concerns: "抽象論が続いて途中で離脱される。",
    targetAi: "ChatGPT",
    aiGoal: "rewrite-pass",
    source: "既存記事のリライト候補。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "『自分で生きていける』子どもを育てるために",
    account: "learnfromfailure",
    type: "rewrite",
    status: "Idea",
    priority: "Medium",
    due: "教育アカウントへ寄せるか再検討",
    summary: "内容は教育寄り。どちらのアカウントで出すか迷っている。",
    nextAction: "アカウントの置き先を決めて、視点を一本化する。",
    concerns: "教育論と親の自立論が混ざりやすい。",
    targetAi: "Claude",
    aiGoal: "rewrite-pass",
    source: "既存記事。",
    archived: false
  },
  {
    id: crypto.randomUUID(),
    title: "仲間内で回る売上は、市場ではない",
    account: "learnfromfailure",
    type: "draft",
    status: "Drafting",
    priority: "Medium",
    due: "比較記事公開の合間",
    summary: "かなり強いテーマ。市場性と内輪商売の違いを噛み砕きたい。",
    nextAction: "具体例を1つだけ入れて、抽象論に寄りすぎないようにする。",
    concerns: "刺さるが敵も作りやすい。",
    targetAi: "ChatGPT",
    aiGoal: "clarity-pass",
    source: "下書きあり。",
    archived: false
  }
];

const lanes = ["Idea", "Drafting", "Polishing", "Rewrite", "Ready"];

const laneLabels = {
  Idea: "Idea",
  Drafting: "Drafting",
  Polishing: "Polishing",
  Rewrite: "Rewrite",
  Ready: "Ready"
};

const reviewChecklist = [
  "冒頭3行で、この記事が何を言いたいか伝わるか。",
  "AIっぽい一般論や、意味の薄い言い換えが残っていないか。",
  "読者が『で、結局どうすればいいの？』で終わらないか。",
  "強い主張に対して、補助線や具体例が足りているか。",
  "比較記事なら、評価軸が先に示されているか。",
  "リライトなら、元記事の良さを消しすぎていないか。"
];

let state = {
  items: loadItems(),
  selectedId: null,
  filters: {
    search: "",
    account: "all",
    type: "all",
    priority: "all"
  }
};

const form = document.getElementById("itemForm");
const board = document.getElementById("board");
const statsGrid = document.getElementById("statsGrid");
const promptOutput = document.getElementById("promptOutput");
const currentIdLabel = document.getElementById("currentIdLabel");
const reviewList = document.getElementById("reviewChecklist");

init();

function init() {
  if (!state.selectedId && state.items.length > 0) {
    state.selectedId = state.items[0].id;
  }

  bindEvents();
  renderChecklist();
  renderAll();
}

function loadItems() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(seedItems);
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(seedItems);
  } catch (error) {
    return structuredClone(seedItems);
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
}

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim().toLowerCase();
    renderBoard();
  });

  document.getElementById("accountFilter").addEventListener("change", (event) => {
    state.filters.account = event.target.value;
    renderBoard();
  });

  document.getElementById("typeFilter").addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    renderBoard();
  });

  document.getElementById("priorityFilter").addEventListener("change", (event) => {
    state.filters.priority = event.target.value;
    renderBoard();
  });

  document.getElementById("newItemBtn").addEventListener("click", () => {
    const newItem = makeEmptyItem();
    state.items.unshift(newItem);
    state.selectedId = newItem.id;
    saveItems();
    renderAll();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const selected = getSelectedItem();
    const updated = {
      ...selected,
      title: String(formData.get("title") || ""),
      account: String(formData.get("account") || "moco_edu_note"),
      type: String(formData.get("type") || "draft"),
      status: String(formData.get("status") || "Idea"),
      priority: String(formData.get("priority") || "Medium"),
      due: String(formData.get("due") || ""),
      summary: String(formData.get("summary") || ""),
      nextAction: String(formData.get("nextAction") || ""),
      concerns: String(formData.get("concerns") || ""),
      targetAi: String(formData.get("targetAi") || "ChatGPT"),
      aiGoal: String(formData.get("aiGoal") || "first-draft"),
      source: String(formData.get("source") || "")
    };
    state.items = state.items.map((item) => item.id === updated.id ? updated : item);
    saveItems();
    renderAll();
  });

  document.getElementById("duplicateBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }
    const duplicate = {
      ...structuredClone(selected),
      id: crypto.randomUUID(),
      title: selected.title + "（複製）",
      archived: false
    };
    state.items.unshift(duplicate);
    state.selectedId = duplicate.id;
    saveItems();
    renderAll();
  });

  document.getElementById("archiveBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    if (!selected) {
      return;
    }
    state.items = state.items.map((item) => item.id === selected.id
      ? { ...item, archived: true, status: "Ready", nextAction: "公開済みまたは完了扱い" }
      : item);
    saveItems();
    renderAll();
  });

  document.getElementById("generatePromptBtn").addEventListener("click", () => {
    const selected = getSelectedItem();
    promptOutput.value = selected ? buildPrompt(selected) : "";
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    state.items = structuredClone(seedItems);
    state.selectedId = state.items[0]?.id || null;
    saveItems();
    renderAll();
  });

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.items, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note-workflow-items.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

function renderAll() {
  renderStats();
  renderBoard();
  renderForm();
}

function renderChecklist() {
  reviewList.innerHTML = reviewChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderStats() {
  const activeItems = state.items.filter((item) => !item.archived);
  const rewriteCount = activeItems.filter((item) => item.type === "rewrite").length;
  const comparisonCount = activeItems.filter((item) => item.type === "comparison").length;
  const readyCount = activeItems.filter((item) => item.status === "Ready").length;
  const highPriorityCount = activeItems.filter((item) => item.priority === "High").length;
  const polishingCount = activeItems.filter((item) => item.status === "Polishing" || item.status === "Rewrite").length;

  const stats = [
    { label: "運用中の記事", value: activeItems.length, note: "アーカイブ以外" },
    { label: "リライト候補", value: rewriteCount, note: "既存記事の更新" },
    { label: "比較記事", value: comparisonCount, note: "教科別・総合" },
    { label: "公開直前", value: readyCount, note: "画像整理・最終確認" },
    { label: "優先度High", value: highPriorityCount, note: "今週動かす候補" },
    { label: "整稿フェーズ", value: polishingCount, note: "人間っぽさ・論点調整" }
  ];

  statsGrid.innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <span>${escapeHtml(stat.label)}</span>
      <strong>${stat.value}</strong>
      <span>${escapeHtml(stat.note)}</span>
    </article>
  `).join("");
}

function renderBoard() {
  const filtered = getFilteredItems();
  board.innerHTML = lanes.map((lane) => {
    const laneItems = filtered.filter((item) => item.status === lane && !item.archived);
    return `
      <section class="lane">
        <div class="lane-head">
          <h3>${laneLabels[lane]}</h3>
          <span>${laneItems.length}件</span>
        </div>
        <div class="lane-items">
          ${laneItems.length ? laneItems.map((item) => renderCard(item)).join("") : '<div class="empty-state">該当なし</div>'}
        </div>
      </section>
    `;
  }).join("");

  board.querySelectorAll(".card-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      renderAll();
    });
  });
}

function renderCard(item) {
  const typeLabel = item.type === "draft"
    ? "新規下書き"
    : item.type === "rewrite"
      ? "リライト"
      : "比較記事";

  const priorityClass = item.priority === "High" ? "" : item.priority === "Medium" ? "alt" : "low";
  const activeClass = item.id === state.selectedId ? "active" : "";

  return `
    <button class="card-item ${activeClass}" type="button" data-id="${item.id}">
      <h4>${escapeHtml(item.title)}</h4>
      <div class="meta-row">
        <span class="chip">${escapeHtml(item.account)}</span>
        <span class="chip alt">${escapeHtml(typeLabel)}</span>
        <span class="chip ${priorityClass}">${escapeHtml(item.priority)}</span>
      </div>
      <p>${escapeHtml(item.nextAction || item.summary || "未入力")}</p>
    </button>
  `;
}

function renderForm() {
  const item = getSelectedItem();
  currentIdLabel.textContent = item ? `ID: ${item.id.slice(0, 8)}` : "";

  if (!item) {
    form.reset();
    promptOutput.value = "";
    return;
  }

  for (const [key, value] of Object.entries(item)) {
    const field = form.elements.namedItem(key);
    if (field && "value" in field) {
      field.value = value ?? "";
    }
  }

  promptOutput.value = buildPrompt(item);
}

function getSelectedItem() {
  return state.items.find((item) => item.id === state.selectedId) || null;
}

function getFilteredItems() {
  return state.items.filter((item) => {
    if (item.archived) {
      return false;
    }

    const matchesSearch = !state.filters.search || [
      item.title,
      item.summary,
      item.nextAction,
      item.concerns,
      item.source
    ].join(" ").toLowerCase().includes(state.filters.search);

    const matchesAccount = state.filters.account === "all" || item.account === state.filters.account;
    const matchesType = state.filters.type === "all" || item.type === state.filters.type;
    const matchesPriority = state.filters.priority === "all" || item.priority === state.filters.priority;

    return matchesSearch && matchesAccount && matchesType && matchesPriority;
  });
}

function makeEmptyItem() {
  return {
    id: crypto.randomUUID(),
    title: "新しい記事",
    account: "moco_edu_note",
    type: "draft",
    status: "Idea",
    priority: "Medium",
    due: "",
    summary: "",
    nextAction: "",
    concerns: "",
    targetAi: "ChatGPT",
    aiGoal: "first-draft",
    source: "",
    archived: false
  };
}

function buildPrompt(item) {
  const intro = item.targetAi === "Claude"
    ? "以下のnote下書きを、読み手にとって自然で分かりやすい文章に整えてください。"
    : "以下のnote下書きについて、構成と論点を保ちながら改善してください。";

  const goalMap = {
    "first-draft": "メモから初稿を作りたいです。強すぎる断定は避けつつ、読みやすい見出し案も出してください。",
    "clarity-pass": "意味が飛ぶ箇所、冗長な箇所、読み手が迷う箇所を減らしてください。",
    "humanize-pass": "AIっぽい言い回し、薄い一般論、無難すぎるまとめを減らして、人が書いた体温を残してください。",
    "opinion-pass": "主張の芯は残しつつ、筆者の意見や立場が見えるようにしてください。",
    "rewrite-pass": "既存記事のリライト前提で、元の良さは残しつつ、いまの読者に届く構成に組み替えてください。",
    "comparison-pass": "比較記事として、評価軸が先に見える形に整理し、結論を先に置いてください。"
  };

  const typeLine = item.type === "comparison"
    ? "この記事は教科別または総合問題のAI比較記事です。"
    : item.type === "rewrite"
      ? "この記事は既存記事のリライト案件です。"
      : "この記事は新規下書きです。";

  return [
    intro,
    "",
    `タイトル: ${item.title}`,
    `掲載アカウント: ${item.account}`,
    `記事種別: ${typeLine}`,
    `今回の目的: ${goalMap[item.aiGoal] || goalMap["clarity-pass"]}`,
    "",
    "前提メモ:",
    item.summary || "未記入",
    "",
    "次にやりたいこと:",
    item.nextAction || "未記入",
    "",
    "違和感・気になる点:",
    item.concerns || "未記入",
    "",
    "参照データ・元記事:",
    item.source || "未記入",
    "",
    "出力の希望:",
    "1. 修正版の本文",
    "2. どこをどう直したかの要点",
    "3. まだ弱い部分があれば最後に短く指摘"
  ].join("\n");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
