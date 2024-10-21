'use client'
import React, { useEffect } from 'react';
import { Card, Button } from '@nextui-org/react';
import Strapi from '@/utils/globalApi';

export default function Affiliate() {

    return (
        <div>
            <Button onClick={async () => await Strapi.getHomepage()}>Get homepage</Button>
            <Button onClick={async () => await Strapi.getAffiliate()}>Get affiliate</Button>
            <Button onClick={async () => await Strapi.getAboutUsNormal()}>Get about us normal</Button>
            <Button onClick={async () => await Strapi.getOneProduct('an-vi-khang-ong-but')}>Product an vi khang ong but</Button>
        </div>
    )
}