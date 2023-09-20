type Props = {
  keyword: string;
  exclusionKeyword: string;
  extensionKeyword: string;
};

export const useGitHubSearch = (props: Props) => {
  const { keyword, exclusionKeyword, extensionKeyword } = props;
  const keywords = keyword.split(" ").filter((v) => v);
  const exclusionKeywords = exclusionKeyword
    .split(" ")
    .filter((v) => v)
    .map((word) => {
      if (word) {
        return "-" + word;
      }
    });
  const extensionKeywords = extensionKeyword
    .replaceAll(",", " ")
    .split(" ")
    .filter((v) => v)
    .map((word) => {
      if (word) {
        if (word.trim().indexOf(".") > 0) {
          return "path:" + word.trim();
        } else {
          return "path:*." + word.trim();
        }
      }
    });
  const parseQuery = (arr) => {
    return arr.includes("OR")
      ? [
          `(${arr
            .filter((v) => v)
            .join(" AND ")
            .replaceAll(" AND OR AND ", " OR ")})`,
        ]
      : arr;
  };
  const baseKeywords = [
    ...parseQuery(keywords),
    ...parseQuery(exclusionKeywords),
    ...(extensionKeywords.length
      ? [`(${extensionKeywords.join(" OR ")})`]
      : []),
  ]
    .filter((v) => v)
    .join(" AND ");
  const searchKeywordQuery = encodeURIComponent(baseKeywords);
  const Open = (type: "Code" | "Packages" | "Repositories") => {
    const query = searchKeywordQuery.trim();
    switch (type) {
      case "Code":
        window.open("https://github.com/search?type=code&q=" + query, "_blank");
        break;
      case "Packages":
        window.open(
          "https://github.com/search?type=registrypackages&q=" + query,
          "_blank"
        );
        break;
      case "Repositories":
        window.open(
          "https://github.com/search?type=repositories&q=" + query,
          "_blank"
        );
        break;
      default:
        alert("else");
    }
  };
  return {
    Open,
  };
};
