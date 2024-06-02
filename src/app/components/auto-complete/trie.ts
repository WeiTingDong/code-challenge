export class TrieNode {
  children: { [key: string]: TrieNode };
  isEnd: boolean;
  word?: string;

  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    const lowerWord = word.toLowerCase();
    for (let char of lowerWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
    node.word = word;
  }

  searchPrefix(prefix: string): TrieNode | null {
    let node = this.root;
    const lowerPrefix = prefix.toLowerCase();
    for (let char of lowerPrefix) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node;
  }

  suggest(prefix: string): string[] {
    const node = this.searchPrefix(prefix);
    const suggestions: string[] = [];
    if (node) {
      this.dfs(node, suggestions);
    }
    return suggestions;
  }

  private dfs(node: TrieNode, suggestions: string[]) {
    if (node.isEnd) {
      suggestions.push(node.word!);
    }
    for (let char in node.children) {
      this.dfs(node.children[char], suggestions);
    }
  }
}
