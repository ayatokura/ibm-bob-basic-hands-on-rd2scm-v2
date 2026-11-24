/* qa.md を日本語に翻訳したFAQデータ */
var FAQ_CATEGORIES = [
  { id: "general", label: "一般" },
  { id: "usage", label: "使い方" },
  { id: "advanced", label: "高度な機能" },
  { id: "troubleshooting", label: "トラブルシューティング" }
];

var FAQ_DATA = [
  /* 一般 */
  {
    id: "what-is-bob",
    category: "general",
    question: "Bobとは何ですか?",
    answer:
      "<p>Bobは、コードの作成、既存コードのリファクタリング、さまざまなタスクの実行を支援する、AI搭載のコーディングパートナーです。カスタムモードやカスタム指示によって、Bobの機能を拡張できます。</p>"
  },
  {
    id: "how-bob-works",
    category: "general",
    question: "Bobはどのように動作しますか?",
    answer:
      "<p>Bobは大規模言語モデル(LLM)を使って、ユーザーの依頼を理解し、具体的な操作に変換します。Bobにできることは次のとおりです。</p>" +
      "<ul>" +
      "<li>プロジェクト内のファイルの読み取りと書き込み</li>" +
      "<li>ターミナルでのコマンド実行</li>" +
      "<li>インターネットの閲覧(有効にしている場合)</li>" +
      "<li>Model Context Protocol(MCP)を介した外部ツールの利用</li>" +
      "</ul>" +
      "<p>ユーザーはチャットインターフェースを通じてBobに指示を出し、Bobが提案する操作を確認・承認します。</p>"
  },
  {
    id: "what-bob-can-do",
    category: "general",
    question: "Bobには何ができますか?",
    answer:
      "<p>Bobは、次のようなさまざまなコーディングタスクを支援できます。</p>" +
      "<ul>" +
      "<li>自然言語による説明からのコード生成</li>" +
      "<li>既存コードのリファクタリング</li>" +
      "<li>バグの修正</li>" +
      "<li>ドキュメントの作成</li>" +
      "<li>コードの解説</li>" +
      "<li>コードベースに関する質問への回答</li>" +
      "<li>繰り返し作業の自動化</li>" +
      "<li>新しいファイルやプロジェクトの作成</li>" +
      "</ul>"
  },
  {
    id: "data-restrictions",
    category: "general",
    question: "Bobで処理してはいけないデータの種類はありますか?",
    answer:
      "<p>次の種類のデータは、Bobで処理しないでください。</p>" +
      "<ul>" +
      "<li>SPI</li>" +
      "<li>個人の健康情報(PHI)</li>" +
      "<li>輸出規制対象データ(ITAR、APP など)</li>" +
      "<li>規制対象の金融データ(銀行口座番号、PAN、非公開の財務データ)</li>" +
      "</ul>"
  },
  {
    id: "risks",
    category: "general",
    question: "Bobを使うリスクは何ですか?",
    answer:
      "<p>Bobは強力なツールであり、責任を持って使うことが重要です。次の点に注意してください。</p>" +
      "<ul>" +
      "<li><strong>Bobは間違えることがあります。</strong>承認する前に、Bobが提案する変更内容を必ず慎重に確認してください。</li>" +
      "<li><strong>Bobはコマンドを実行できます。</strong>特に自動承認を使っている場合は、Bobへのコマンド実行の依頼に注意してください。</li>" +
      "</ul>"
  },

  /* 使い方 */
  {
    id: "start-task",
    category: "usage",
    question: "新しいタスクはどのように始めますか?",
    answer:
      "<p>Bobパネルを開き、チャットボックスにタスクを入力します。Bobにしてほしいことを、明確かつ具体的に伝えてください。</p>"
  },
  {
    id: "switch-modes",
    category: "usage",
    question: "モードはどのように切り替えますか?",
    answer:
      "<p>チャット入力エリアのドロップダウンメニューから別のモードを選択するか、<code>/</code> コマンドで特定のモードに切り替えます。</p>"
  },
  {
    id: "tools",
    category: "usage",
    question: "ツールとは何ですか?どのように使いますか?",
    answer:
      "<p>ツールは、Bobがお使いのシステムとやり取りするための手段です。Bobはタスクの実行に適したツールを自動的に選んで使うため、ユーザーがツールを直接呼び出す必要はありません。ツールが使われる際は、承認または拒否を求められます。</p>"
  },
  {
    id: "context-mentions",
    category: "usage",
    question: "コンテキストメンションとは何ですか?",
    answer:
      "<p>コンテキストメンションは、ファイル、フォルダー、問題など、プロジェクトに関する特定の情報をBobに渡す方法です。<code>@</code> 記号に続けて、指定したい対象を入力します(例: <code>@/src/file.ts</code>、<code>@problems</code>)。</p>"
  },
  {
    id: "run-commands",
    category: "usage",
    question: "Bobは私のターミナルでコマンドを実行できますか?",
    answer:
      "<p>はい、Bobはコマンドを実行できます。コマンドの自動承認を有効にしていない限り、コマンドごとに承認を求められます。コマンドを自動承認する場合は、細心の注意を払ってください。</p>"
  },
  {
    id: "feedback",
    category: "usage",
    question: "Bobにフィードバックを伝えるにはどうすればよいですか?",
    answer:
      "<p>Bobが提案する操作を承認または拒否することで、フィードバックを伝えられます。フィードバック欄を使えば、追加のフィードバックも入力できます。</p>"
  },
  {
    id: "customize",
    category: "usage",
    question: "Bobの動作をカスタマイズできますか?",
    answer:
      "<p>はい、次のような方法でBobをカスタマイズできます。</p>" +
      "<ul>" +
      "<li><strong>カスタム指示:</strong>すべてのモードに適用される一般的な指示や、モード固有の指示を設定できます。</li>" +
      "<li><strong>カスタムモード:</strong>独自のプロンプトと一部のツール権限を持つ、オリジナルのモードを作成できます。</li>" +
      "<li><strong>Bobルール:</strong>プロジェクトのルートにある <code>.bob/rules/</code> フォルダーにMarkdownのルールファイルを作成して、追加のガイドラインを提供できます。</li>" +
      "<li><strong>設定:</strong>自動承認、差分編集など、さまざまな設定を調整できます。</li>" +
      "</ul>"
  },
  {
    id: "auto-approval",
    category: "usage",
    question: "Bobには自動承認の設定がありますか?",
    answer:
      "<p>はい、有効にすると操作を自動的に承認する設定がいくつかあります。</p>"
  },

  /* 高度な機能 */
  {
    id: "what-is-mcp",
    category: "advanced",
    question: "MCP(Model Context Protocol)とは何ですか?",
    answer:
      "<p>MCPは、Bobが外部サーバーと通信するためのプロトコルです。カスタムツールやリソースによって、Bobの機能を拡張できます。</p>"
  },
  {
    id: "create-mcp-server",
    category: "advanced",
    question: "独自のMCPサーバーを作成できますか?",
    answer:
      "<p>はい、独自のMCPサーバーを作成して、Bobにカスタム機能を追加できます。</p>"
  },

  /* トラブルシューティング */
  {
    id: "not-responding",
    category: "troubleshooting",
    question: "Bobが応答しません。どうすればよいですか?",
    answer:
      "<ul>" +
      "<li>APIキーが正しく、有効期限が切れていないことを確認してください。</li>" +
      "<li>インターネット接続を確認してください。</li>" +
      "<li>VS Codeを再起動してみてください。</li>" +
      "</ul>"
  },
  {
    id: "undo-changes",
    category: "troubleshooting",
    question: "Bobが意図しない変更を行いました。元に戻すにはどうすればよいですか?",
    answer:
      "<p>BobはVS Codeの組み込みのファイル編集機能を使用しています。標準の「元に戻す」コマンド(<code>Ctrl/Cmd + Z</code>)で変更を取り消せます。チェックポイントを使って、ファイルに加えられた変更を元に戻すこともできます。</p>"
  }
];
