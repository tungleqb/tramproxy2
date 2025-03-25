import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReferralCode() {
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get('http://100.88.204.66:8000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setReferralCode(res.data.referral_code || '');
            })
            .catch(err => console.error('Lỗi khi tải mã giới thiệu:', err));
    }, []);

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Mã giới thiệu</h2>

            {referralCode ? (
                <div className="bg-gray-100 p-4 rounded text-center text-xl font-semibold">
                    {referralCode}
                </div>
            ) : (
                <p className="text-gray-600">Bạn chưa có mã giới thiệu.</p>
            )}
        </div>
    );
}
