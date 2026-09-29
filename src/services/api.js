const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

export const api = {
  // Home Data Aggregation
  async getHomeData() {
    const res = await fetch(`${API_BASE}/home`);
    return handleResponse(res);
  },

  // Draws
  async getCurrentDraw() {
    const res = await fetch(`${API_BASE}/draw/current`);
    return handleResponse(res);
  },

  async getDrawById(id) {
    const res = await fetch(`${API_BASE}/draw/${id}`);
    return handleResponse(res);
  },

  // Prizes
  async getPrizes() {
    const res = await fetch(`${API_BASE}/prizes`);
    return handleResponse(res);
  },

  // Offers
  async getOffers() {
    const res = await fetch(`${API_BASE}/offers`);
    return handleResponse(res);
  },

  // Winners
  async getWinners(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/winners?${query}`);
    return handleResponse(res);
  },

  async getRecentWinners() {
    const res = await fetch(`${API_BASE}/winners/recent`);
    return handleResponse(res);
  },

  // FAQs
  async getFaqs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/faqs?${query}`);
    return handleResponse(res);
  },

  // Tickets
  async getTicket(ticketNumber) {
    const res = await fetch(`${API_BASE}/tickets/${encodeURIComponent(ticketNumber)}`);
    return handleResponse(res);
  },

  // Participation Workflow
  async requestOtp(phone) {
    const res = await fetch(`${API_BASE}/participants/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return handleResponse(res);
  },

  async verifyOtp(phone, otp) {
    const res = await fetch(`${API_BASE}/participants/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return handleResponse(res);
  },

  async registerParticipant(data) {
    const res = await fetch(`${API_BASE}/participants/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Contact
  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Admin APIs
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  async adminVerify2Fa(challengeToken, otp) {
    const res = await fetch(`${API_BASE}/admin/verify-2fa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeToken, otp })
    });
    return handleResponse(res);
  },

  async getAdminRegistrations(token, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/registrations?${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(res);
  },


  async getAdminDashboard(token) {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(res);
  },

  async getAdminAuditLogs(token) {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return handleResponse(res);
  },

  async adminUpdateDraw(id, data, token) {
    const res = await fetch(`${API_BASE}/admin/draw/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async adminTriggerDraw(id, prizeId, token) {
    const res = await fetch(`${API_BASE}/admin/draw/${id}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ prizeId })
    });
    return handleResponse(res);
  },

  async executeAdminSpin(planType, token) {
    const res = await fetch(`${API_BASE}/admin/spin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ planType })
    });
    return handleResponse(res);
  }
};
