FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

RUN bunx prisma generate

EXPOSE 3000

CMD sh -c "bunx prisma db push && bun run index.ts"