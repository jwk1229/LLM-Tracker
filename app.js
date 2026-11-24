(() => {
  'use strict';

  const TRACKED_KEYWORDS = ['AI', '인공지능', 'LLM', '오픈소스', '출시'];
  const REQUIRED_TITLE_KEYWORDS = ['AI', '인공지능', 'LLM'];
  const REQUIRED_BODY_KEYWORDS = ['출시', '업데이트', '오픈소스'];
  const HOURS_24_MS = 24 * 60 * 60 * 1000;
  const HOURS_2_MS = 2 * 60 * 60 * 1000;

  const state = {
    accessTime: Date.now(),
    view: 'table', // 'table' | 'grouped'
    selectedCategory: '전체',
    selectedKeyword: '전체',
    searchScope: 'all',
    searchQuery: ''
  };

  /**
   * 접속 시점(now)을 기준으로 Google 뉴스 수집 원천 데이터를 생성합니다.
   * 조건 통과 기사 + PRD 제외 대상(24시간 초과, 주식 시황, arXiv, 본문 조건 미달)을
   * 함께 포함하여 실제 선별 파이프라인이 동작하도록 구성했습니다.
   */
  function buildRawFeed(now) {
    const minutesAgo = (m) => now - m * 60 * 1000;
    const hoursAgo = (h) => now - h * 60 * 60 * 1000;

    return [
      {
        id: 'news-01',
        title: 'OpenAI, 추론 속도와 코드 정확도를 높인 신규 경량 AI 모델 출시',
        body: 'OpenAI가 개발자 API와 챗 인터페이스에 즉시 적용 가능한 경량 추론 모델을 공식 출시하고 지연 시간을 대폭 개선했다.',
        organization: 'OpenAI',
        summary: '추론 지연 시간을 40% 줄인 경량 AI 모델을 API 및 앱에 동시 출시.',
        category: '신규 모델 공개',
        source: 'ZDNet Korea',
        link: 'https://news.google.com/search?q=OpenAI+AI+%EC%B6%9C%EC%8B%9C&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: minutesAgo(18),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-02',
        title: 'Google, Gemini API 토큰 단가 인하 및 멀티모달 컨텍스트 업데이트 발표',
        body: 'Google이 기업용 AI 워크로드를 겨냥해 API 입력 토큰 가격 인하와 함께 장문 컨텍스트 캐싱 기능 업데이트를 적용했다.',
        organization: 'Google',
        summary: 'Gemini API 입력 토큰 가격 인하 및 장문 컨텍스트 캐싱 기능 업데이트.',
        category: 'API 가격 인하',
        source: '전자신문',
        link: 'https://news.google.com/search?q=Google+Gemini+API+%EA%B0%80%EA%B2%A9+%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: minutesAgo(47),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-03',
        title: 'Meta, 상업적 활용 가능한 차세대 오픈소스 LLM 가중치 전격 공개',
        body: 'Meta가 다국어 추론 성능을 강화한 차세대 오픈소스 대형언어모델(LLM)을 출시하며 온프레미스 배포 도구를 함께 제공했다.',
        organization: 'Meta',
        summary: '다국어 성능을 높인 상업용 오픈소스 LLM 모델과 로컬 배포 툴킷 공개.',
        category: '오픈소스',
        source: 'IT조선',
        link: 'https://news.google.com/search?q=Meta+%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4+LLM&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: minutesAgo(95),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-04',
        title: 'Anthropic, Claude 코드 에이전트 자동 테스트 및 워크플로우 업데이트',
        body: 'Anthropic이 장시간 코딩 세션 안정성과 IDE 통합 기능을 강화한 대규모 기능 업데이트를 배포했다.',
        organization: 'Anthropic',
        summary: '장시간 코딩 작업 안정성과 IDE 통합을 개선한 Claude 에이전트 업데이트.',
        category: '기능 업데이트',
        source: '블로터',
        link: 'https://news.google.com/search?q=Anthropic+Claude+AI+%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(3.2),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-05',
        title: '국내 인공지능 스타트업 생태계, 한국어 특화 경량 LLM 연합 배포 추진',
        body: '복수의 연구 그룹과 개발자 커뮤니티가 참여해 한국어 문서 요약에 최적화된 오픈소스 모델 가중치를 순차 출시한다.',
        organization: '',
        summary: '한국어 문서 처리에 특화된 경량 오픈소스 LLM 가중치 순차 배포 예정.',
        category: '오픈소스',
        source: 'AI타임스',
        link: 'https://news.google.com/search?q=%ED%95%9C%EA%B5%AD%EC%96%B4+%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5+%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4+LLM&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(5.5),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-06',
        title: 'NVIDIA, 분산 LLM 추론 최적화 전문 AI 인프라 기업 인수합병 체결',
        body: 'NVIDIA가 데이터센터 추론 지연 시간을 줄이는 스케줄링 소프트웨어 기업을 인수하고 차기 플랫폼 업데이트에 통합한다.',
        organization: 'NVIDIA',
        summary: '분산 LLM 추론 최적화 스타트업 인수 및 차기 AI 인프라 스택 통합 예고.',
        category: '기업 인수합병',
        source: '디지털데일리',
        link: 'https://news.google.com/search?q=NVIDIA+LLM+AI+%EC%9D%B8%EC%88%98%ED%95%A9%EB%B3%91&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(8.4),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-07',
        title: '네이버클라우드, 기업용 인공지능 에이전트 빌더 정식 출시',
        body: '네이버클라우드가 사내 문서 검색과 업무 자동화를 연동하는 노코드 AI 에이전트 빌더를 정식 출시했다.',
        organization: '네이버클라우드',
        summary: '사내 문서 연동 및 업무 자동화를 지원하는 기업용 AI 에이전트 빌더 출시.',
        category: '신규 모델 공개',
        source: '매일경제',
        link: 'https://news.google.com/search?q=%EB%84%A4%EC%9D%B4%EB%B2%84%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C+%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5+%EC%B6%9C%EC%8B%9C&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(11.1),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-08',
        title: '글로벌 AI 검색 서비스, 실시간 출처 검증 기능 시범 업데이트',
        body: '주요 검색 플랫폼이 생성형 답변의 출처 신뢰도를 자동 표기하는 기능을 업데이트하며 테스트 범위를 확대했다.',
        organization: null,
        summary: '생성형 AI 답변의 원문 출처를 자동 교차 검증하는 기능 시범 업데이트.',
        category: '',
        source: '한국경제',
        link: 'https://news.google.com/search?q=AI+%EA%B2%80%EC%83%89+%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(15.6),
        isStockMarket: false,
        isArxiv: false
      },
      {
        id: 'news-09',
        title: 'Mistral, 온디바이스 실행을 겨냥한 초경량 오픈소스 LLM 3종 출시',
        body: 'Mistral이 노트북과 모바일 기기에서도 구동되는 오픈소스 LLM 라인업을 출시하고 API 요금도 함께 인하했다.',
        organization: 'Mistral',
        summary: '모바일·노트북 로컬 구동용 초경량 오픈소스 LLM 3종 출시 및 요금 인하.',
        category: '신규 모델 공개',
        source: '바이라인네트워크',
        link: 'https://news.google.com/search?q=Mistral+%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4+LLM+%EC%B6%9C%EC%8B%9C&hl=ko&gl=KR&ceid=KR:ko',
        publishedAt: hoursAgo(20.3),
        isStockMarket: false,
        isArxiv: false
      },
      // --- 아래 항목들은 PRD 필터링 규칙에 의해 자동 제외되는 검증용 원천 데이터 ---
      {
        id: 'excluded-stock',
        title: 'AI 반도체 관련주 장중 급등…외국인 매수세 유입',
        body: '코스피 시장에서 AI 테마 종목이 강세를 보이며 거래량이 증가하고 신규 리포트가 출시됐다.',
        organization: 'N/A',
        summary: '단순 주식 시황 기사 (제외 대상)',
        category: '시황',
        source: '증권일보',
        link: 'https://news.google.com',
        publishedAt: hoursAgo(2),
        isStockMarket: true,
        isArxiv: false
      },
      {
        id: 'excluded-arxiv',
        title: 'LLM 추론 효율성 개선을 위한 희소 어텐션 논문 arXiv 게재',
        body: '연구진은 오픈소스 실험 코드를 공개하며 새로운 어텐션 구조를 제안했다.',
        organization: 'N/A',
        summary: 'arXiv 원문 직접 크롤링 제외 대상',
        category: '논문',
        source: 'arXiv',
        link: 'https://arxiv.org',
        publishedAt: hoursAgo(4),
        isStockMarket: false,
        isArxiv: true
      },
      {
        id: 'excluded-old',
        title: '오래된 AI 모델 출시 소식 (24시간 초과)',
        body: '26시간 전 발표된 AI 모델 출시 기사입니다.',
        organization: 'ExampleAI',
        summary: '24시간 초과 기사 제외 대상',
        category: '신규 모델 공개',
        source: '테크뉴스',
        link: 'https://news.google.com',
        publishedAt: hoursAgo(26),
        isStockMarket: false,
        isArxiv: false
      }
    ];
  }

  function normalizeField(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      return 'N/A';
    }
    return value.trim();
  }

  function includesAny(text, keywords) {
    const lower = text.toLowerCase();
    return keywords.some((kw) => lower.includes(kw.toLowerCase()));
  }

  /**
   * PRD 완료 기준 및 선별 규칙 적용:
   * 1) 접속 시점 기준 최근 24시간 이내
   * 2) 제목에 AI / 인공지능 / LLM 중 1개 이상 포함
   * 3) 본문에 출시 / 업데이트 / 오픈소스 중 1개 이상 포함
   * 4) 단순 주식 시황 기사 및 arXiv 원문 제외
   * 5) 원문 누락 정보는 'N/A' 표기
   * 6) 게시 시각 기준 최신순 정렬
   */
  function getEligibleArticles(rawList, now) {
    const matched = [];
    let excludedCount = 0;

    rawList.forEach((item) => {
      const age = now - item.publishedAt;
      const within24h = age >= 0 && age <= HOURS_24_MS;
      const hasTitleKeyword = includesAny(item.title, REQUIRED_TITLE_KEYWORDS);
      const hasBodyKeyword = includesAny(item.body, REQUIRED_BODY_KEYWORDS);
      const notExcluded = !item.isStockMarket && !item.isArxiv;

      if (within24h && hasTitleKeyword && hasBodyKeyword && notExcluded) {
        matched.push({
          ...item,
          organization: normalizeField(item.organization),
          category: normalizeField(item.category),
          summary: normalizeField(item.summary),
          source: normalizeField(item.source)
        });
      } else {
        excludedCount += 1;
      }
    });

    matched.sort((a, b) => b.publishedAt - a.publishedAt);
    return { matched, excludedCount };
  }

  function formatRelativeTime(timestamp, now) {
    const diffMs = Math.max(0, now - timestamp);
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return '방금 전';
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHours = Math.floor(diffMin / 60);
    return `${diffHours}시간 전`;
  }

  function formatClock(timestamp) {
    const d = new Date(timestamp);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} 기준`;
  }

  function isNewArticle(timestamp, now) {
    return now - timestamp <= HOURS_2_MS;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyUserFilters(articles) {
    return articles.filter((item) => {
      if (state.selectedCategory !== '전체' && item.category !== state.selectedCategory) {
        return false;
      }

      if (state.selectedKeyword !== '전체') {
        const combined = `${item.title} ${item.body} ${item.summary} ${item.category}`.toLowerCase();
        if (!combined.includes(state.selectedKeyword.toLowerCase())) {
          return false;
        }
      }

      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.trim().toLowerCase();
        if (state.searchScope === 'title') {
          return item.title.toLowerCase().includes(q);
        }
        if (state.searchScope === 'org') {
          return item.organization.toLowerCase().includes(q);
        }
        if (state.searchScope === 'source') {
          return item.source.toLowerCase().includes(q);
        }
        const full = `${item.title} ${item.organization} ${item.summary} ${item.category} ${item.source}`.toLowerCase();
        return full.includes(q);
      }

      return true;
    });
  }

  function renderCategories(eligibleArticles) {
    const categoryMenu = document.getElementById('categoryMenu');
    const counts = new Map();
    eligibleArticles.forEach((item) => {
      counts.set(item.category, (counts.get(item.category) || 0) + 1);
    });

    const orderedCategories = ['전체', ...Array.from(counts.keys()).sort((a, b) => {
      if (a === 'N/A') return 1;
      if (b === 'N/A') return -1;
      return a.localeCompare(b, 'ko');
    })];

    categoryMenu.innerHTML = orderedCategories
      .map((cat) => {
        const count = cat === '전체' ? eligibleArticles.length : counts.get(cat) || 0;
        const activeClass = state.selectedCategory === cat ? ' is-active' : '';
        return `
          <li>
            <button type="button" class="rail-item${activeClass}" data-category="${escapeHtml(cat)}">
              <span>${escapeHtml(cat)}</span>
              <span class="rail-item__count">${count}</span>
            </button>
          </li>
        `;
      })
      .join('');
  }

  function renderKeywordChips() {
    const container = document.getElementById('keywordChips');
    const chips = ['전체', ...TRACKED_KEYWORDS];
    container.innerHTML = chips
      .map((kw) => {
        const activeClass = state.selectedKeyword === kw ? ' is-active' : '';
        return `
          <button type="button" class="filter-chip${activeClass}" data-keyword="${escapeHtml(kw)}">
            ${escapeHtml(kw)}
          </button>
        `;
      })
      .join('');

    const trackedContainer = document.getElementById('trackedKeywordsList');
    trackedContainer.innerHTML = TRACKED_KEYWORDS.map((kw) => {
      const activeClass = state.selectedKeyword === kw ? ' is-active' : '';
      return `
        <button type="button" class="tracked-tag${activeClass}" data-keyword="${escapeHtml(kw)}">
          #${escapeHtml(kw)}
        </button>
      `;
    }).join('');
  }

  function renderTableView(filteredArticles) {
    const tbody = document.getElementById('newsTableBody');
    tbody.innerHTML = filteredArticles
      .map((item) => {
        const freshBadge = isNewArticle(item.publishedAt, state.accessTime)
          ? '<span class="micro-badge micro-badge--alert" aria-label="새 기사">N</span>'
          : '';
        const orgHtml =
          item.organization === 'N/A'
            ? '<span class="cell-na">N/A</span>'
            : `<span class="cell-org-text" title="${escapeHtml(item.organization)}">${escapeHtml(item.organization)}</span>`;
        const catHtml =
          item.category === 'N/A'
            ? '<span class="cell-na">N/A</span>'
            : `<span class="category-tag" title="${escapeHtml(item.category)}">${escapeHtml(item.category)}</span>`;

        return `
          <tr>
            <td class="col-title">
              <div class="cell-title-wrap">
                <div class="cell-title-row">
                  <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="article-title" title="${escapeHtml(item.title)}">
                    ${escapeHtml(item.title)}
                  </a>
                  ${freshBadge}
                </div>
                <span class="article-time">${escapeHtml(formatRelativeTime(item.publishedAt, state.accessTime))}</span>
              </div>
            </td>
            <td class="col-org">${orgHtml}</td>
            <td class="col-summary">
              <span class="cell-summary-text" title="${escapeHtml(item.summary)}">${escapeHtml(item.summary)}</span>
            </td>
            <td class="col-category">${catHtml}</td>
            <td class="col-source">
              <span class="cell-source-text" title="${escapeHtml(item.source)}">${escapeHtml(item.source)}</span>
            </td>
            <td class="col-link">
              <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="link-action">원문</a>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  function renderGroupedView(filteredArticles) {
    const container = document.getElementById('groupedView');
    const groups = new Map();

    filteredArticles.forEach((item) => {
      if (!groups.has(item.category)) {
        groups.set(item.category, []);
      }
      groups.get(item.category).push(item);
    });

    container.innerHTML = Array.from(groups.entries())
      .map(([category, items]) => {
        const badgeLabel = category === 'N/A' ? 'N/A' : category.slice(0, 2);
        const rowsHtml = items
          .map((item) => {
            const freshBadge = isNewArticle(item.publishedAt, state.accessTime)
              ? '<span class="micro-badge micro-badge--alert" aria-label="새 기사">N</span>'
              : '';
            return `
              <li class="group-row">
                <div class="group-row__main">
                  <div class="group-row__title-line">
                    <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer" class="group-row__title" title="${escapeHtml(item.title)}">
                      ${escapeHtml(item.title)}
                    </a>
                    ${freshBadge}
                  </div>
                  <p class="group-row__summary">${escapeHtml(item.summary)}</p>
                </div>
                <div class="group-row__meta">
                  <span class="group-row__org">${escapeHtml(item.organization)}</span>
                  <span>${escapeHtml(item.source)}</span>
                  <span>${escapeHtml(formatRelativeTime(item.publishedAt, state.accessTime))}</span>
                </div>
              </li>
            `;
          })
          .join('');

        return `
          <article class="feed-group">
            <header class="feed-group__header">
              <div class="feed-group__identity">
                <span class="group-thumb" aria-hidden="true">${escapeHtml(badgeLabel)}</span>
                <div>
                  <h2 class="group-title">${escapeHtml(category)}</h2>
                  <span class="group-meta">최근 24시간 ${items.length}건</span>
                </div>
              </div>
            </header>
            <ul class="group-rows">${rowsHtml}</ul>
          </article>
        `;
      })
      .join('');
  }

  function render() {
    const raw = buildRawFeed(state.accessTime);
    const { matched, excludedCount } = getEligibleArticles(raw, state.accessTime);
    const filtered = applyUserFilters(matched);

    // Header & Sidebar stats
    const freshCount = matched.filter((item) => isNewArticle(item.publishedAt, state.accessTime)).length;
    const naCount = matched.filter((item) => item.organization === 'N/A' || item.category === 'N/A').length;

    document.getElementById('lastSyncedAt').textContent = formatClock(state.accessTime);
    document.getElementById('newCountBadge').textContent = String(freshCount);
    document.getElementById('resultCountLabel').textContent = `총 ${filtered.length}건`;
    document.getElementById('statMatched').textContent = `${matched.length}건`;
    document.getElementById('statFresh').textContent = `${freshCount}건`;
    document.getElementById('statExcluded').textContent = `${excludedCount}건`;
    document.getElementById('statNaCount').textContent = `${naCount}건`;

    renderCategories(matched);
    renderKeywordChips();

    // View toggle & empty state
    const tableView = document.getElementById('tableView');
    const groupedView = document.getElementById('groupedView');
    const emptyState = document.getElementById('emptyState');

    if (filtered.length === 0) {
      tableView.hidden = true;
      groupedView.hidden = true;
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      if (state.view === 'table') {
        tableView.hidden = false;
        groupedView.hidden = true;
        renderTableView(filtered);
      } else {
        tableView.hidden = true;
        groupedView.hidden = false;
        renderGroupedView(filtered);
      }
    }

    // View menu active state
    document.querySelectorAll('#viewMenu .rail-item').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.view === state.view);
    });
  }

  function bindEvents() {
    document.getElementById('viewMenu').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view]');
      if (!btn) return;
      state.view = btn.dataset.view;
      render();
    });

    document.getElementById('categoryMenu').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category]');
      if (!btn) return;
      state.selectedCategory = btn.dataset.category;
      render();
    });

    const handleKeywordClick = (e) => {
      const btn = e.target.closest('[data-keyword]');
      if (!btn) return;
      const kw = btn.dataset.keyword;
      state.selectedKeyword = state.selectedKeyword === kw && kw !== '전체' ? '전체' : kw;
      render();
    };

    document.getElementById('keywordChips').addEventListener('click', handleKeywordClick);
    document.getElementById('trackedKeywordsList').addEventListener('click', handleKeywordClick);

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchScope = document.getElementById('searchScope');

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.searchScope = searchScope.value;
      state.searchQuery = searchInput.value;
      render();
    });

    searchInput.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      render();
    });

    searchScope.addEventListener('change', () => {
      state.searchScope = searchScope.value;
      render();
    });

    const refresh = () => {
      state.accessTime = Date.now();
      render();
    };

    document.getElementById('headerRefreshBtn').addEventListener('click', refresh);
    document.getElementById('sidebarRefreshBtn').addEventListener('click', refresh);

    document.getElementById('resetFilterBtn').addEventListener('click', () => {
      state.selectedCategory = '전체';
      state.selectedKeyword = '전체';
      state.searchScope = 'all';
      state.searchQuery = '';
      searchScope.value = 'all';
      searchInput.value = '';
      render();
    });
  }

  bindEvents();
  render();
})();
