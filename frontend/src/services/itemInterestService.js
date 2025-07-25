import api from '@/utils/api';

export async function createInterest(payload) {
  // payload: { item_id, interest_type, note (optional) }
  const res = await api.post('/item-interest/interest/', payload);
  return res.data;
}

export async function removeInterest(payload) {
  // payload: { item, interest_type }
  const res = await api.delete('/item-interest/interest/remove/', { data: payload });
  return res.data;
}

export async function listMyInterests() {
  const res = await api.get('/item-interest/my-interests/');
  return res.data;
}
