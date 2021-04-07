let
    pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
    name = "wtbx-dev"; # you won't find anything here either.
    buildInputs = with pkgs; [ nodejs yarn ];
}
