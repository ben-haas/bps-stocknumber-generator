# Stock Number Generator

## Overview

This tool was created to facilitate the creation of stock numbers and product codes for new items added to inventory at Bryant Pipe & Supply. The inventory management system used at the company does not feature a way to automatically increment or track new numbers. In order prevent duplicates and cut down the time it takes to figure out the next number, a tool was needed.

The stock numbers are anywhere from 1 to 6 digits in length and are assigned sequentially.

The product code is 10 digits and contains the stocknumber and the 3 digit product line separated by a hyphen.
</br></br>

> ### Stock Number -> `24629`
>
> ### Product Code -> `NEL-024629`

</br></br>
There are special cases where the product code will include the part number from the manufacturer in place of the stock number. In those cases, there will still be a unique stock number assigned.

## Requirements

- Azure AD client secrets for authentication

- MongoDB Atlas database

This application uses Azure AD to authenticate users inside of our organization. It is very easy to implement other OAuth providers using [next-auth.js](https://next-auth.js.org/).
