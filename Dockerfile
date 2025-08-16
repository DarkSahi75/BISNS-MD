FROM node:lts-bullseye  # LTS සහය දක්වන bullseye අනුවාදයට යාවත්කාලීන කර ඇත

# අවශ්‍ය පැකේජ ස්ථාපනය කිරීම
RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# පැකේජ් ගොනු ප්‍රථාය කර ස්ථාපනය කිරීම
COPY package.json package-lock.json ./
RUN npm install && npm install -g qrcode-terminal pm2

# ඉතිරි යෙදුම් කේතය පිටපත් කිරීම
COPY . .

EXPOSE 5000

CMD ["npm", "start"]  # PM2 භාවිතා කරන ලදී
