const API_BASE = '/api';

export async function fetchOutfits(category = 'All', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/outfits?${params.toString()}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to fetch outfits');
  return json.data;
}

export async function fetchOutfitById(id) {
  const res = await fetch(`${API_BASE}/outfits/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Outfit not found');
  return json.data;
}

export async function fetchSampleModels() {
  const res = await fetch(`${API_BASE}/outfits/sample-models`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to fetch sample models');
  return json.data;
}

export async function createOutfit(formData) {
  const res = await fetch(`${API_BASE}/outfits`, {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to save outfit');
  return json.data;
}

export async function updateOutfit(id, formData) {
  const res = await fetch(`${API_BASE}/outfits/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to update outfit');
  return json.data;
}

export async function deleteOutfit(id) {
  const res = await fetch(`${API_BASE}/outfits/${id}`, {
    method: 'DELETE',
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Failed to delete outfit');
  return true;
}

export async function processVirtualTryOn(formData) {
  const res = await fetch(`${API_BASE}/try-on/process`, {
    method: 'POST',
    body: formData,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Virtual try-on processing failed');
  return json.data;
}

export async function checkTryOnStatus() {
  const res = await fetch(`${API_BASE}/try-on/status`);
  const json = await res.json();
  return json;
}
