export const fetchUserData = async (token: string) => {
    const response = await fetch('https://budgetapi.tonitu.dev/api/user/myinformation', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  };
  
  export const updateUserData = async (token: string | null, data: any) => {
    const response = await fetch('https://budgetapi.tonitu.dev/api/user/myinformation', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user data');
    return response.json();
  };
  