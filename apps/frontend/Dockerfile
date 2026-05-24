FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3001

CMD ["bun", "run", "dev", "--host", "0.0.0.0", "--port", "3001"]