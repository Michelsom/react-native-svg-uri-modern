#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Função para executar comandos
function exec(command) {
  console.log(`Executando: ${command}`)
  try {
    execSync(command, { stdio: "inherit" })
  } catch (error) {
    console.error(`Erro ao executar: ${command}`)
    process.exit(1)
  }
}

// Verificar se está logado no NPM
function checkNpmLogin() {
  try {
    execSync("npm whoami", { stdio: "pipe" })
    console.log("✅ Logado no NPM")
  } catch (error) {
    console.error("❌ Não está logado no NPM. Execute: npm login")
    process.exit(1)
  }
}

// Verificar se o repositório está limpo
function checkGitStatus() {
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" })
    if (status.trim()) {
      console.error("❌ Repositório tem mudanças não commitadas")
      process.exit(1)
    }
    console.log("✅ Repositório limpo")
  } catch (error) {
    console.error("❌ Erro ao verificar status do Git")
    process.exit(1)
  }
}

// Função principal
function main() {
  console.log("🚀 Iniciando processo de publicação...\n")

  // Verificações
  checkNpmLogin()
  checkGitStatus()

  // Limpar build anterior
  console.log("🧹 Limpando build anterior...")
  exec("npm run clean")

  // Executar testes
  console.log("🧪 Executando testes...")
  exec("npm test")

  // Build
  console.log("🔨 Fazendo build...")
  exec("npm run build")

  // Verificar se os arquivos foram gerados
  if (!fs.existsSync(path.join(__dirname, "..", "lib"))) {
    console.error("❌ Pasta lib não foi gerada")
    process.exit(1)
  }

  console.log("✅ Build concluído com sucesso")

  // Publicar
  console.log("📦 Publicando no NPM...")
  exec("npm publish --access public")

  console.log("🎉 Publicação concluída com sucesso!")
  console.log("📋 Próximos passos:")
  console.log("   1. Criar uma tag no Git: git tag v1.0.0")
  console.log("   2. Push da tag: git push origin v1.0.0")
  console.log("   3. Criar release no GitHub")
}

main()
