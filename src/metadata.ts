/* eslint-disable */
export default async () => {
    const t = {
        ["./users/user.entity"]: await import("./users/user.entity"),
        ["./songs/songs.entity"]: await import("./songs/songs.entity"),
        ["./songs/types"]: await import("./songs/types"),
        ["./artists/artist.entity"]: await import("./artists/artist.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/user.entity"), { "UserEntity": { id: { required: true, type: () => Number }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, twoFASecret: { required: true, type: () => String }, enable2FA: { required: true, type: () => Boolean }, apiKey: { required: true, type: () => String }, apiSecret: { required: true, type: () => String } } }], [import("./artists/artist.entity"), { "ArtistEntity": { id: { required: true, type: () => Number }, user: { required: true, type: () => t["./users/user.entity"].UserEntity }, songs: { required: true, type: () => [t["./songs/songs.entity"].Song] } } }], [import("./songs/songs.entity"), { "Song": { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, releaseDate: { required: true, type: () => Date }, duration: { required: true, type: () => Date }, album: { required: true, type: () => String }, lyrics: { required: true, type: () => String }, category: { required: true, enum: t["./songs/types"].SongCategory }, artists: { required: true, type: () => [t["./artists/artist.entity"].ArtistEntity] } } }], [import("./songs/dto/create-song.dto"), { "CreateSongDto": { title: { required: true, type: () => String }, artists: { required: true, type: () => [String] }, releaseDate: { required: true, type: () => Date }, album: { required: true, type: () => String }, duration: { required: true, type: () => Date }, lyrics: { required: true, type: () => String }, category: { required: true, enum: t["./songs/types"].SongCategory } } }], [import("./users/dto/create-user.dto"), { "CreateUserDto": { username: { required: true, type: () => String, minLength: 8 }, password: { required: true, type: () => String, minLength: 8, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/" } } }], [import("./users/dto/signIn-credentials.dto"), { "SignInUserDto": { username: { required: true, type: () => String, minLength: 8 }, password: { required: true, type: () => String } } }], [import("./songs/dto/update-song.dto"), { "CreateSongDto": { title: { required: true, type: () => String }, artists: { required: true, type: () => [String] }, releaseDate: { required: true, type: () => Date }, album: { required: true, type: () => String }, duration: { required: true, type: () => Date }, lyrics: { required: true, type: () => String }, category: { required: true, enum: t["./songs/types"].SongCategory } } }], [import("./users/dto/update-user.dto"), { "UpdateUserDto": { username: { required: true, type: () => String }, twoFASecret: { required: true, type: () => String }, enable2FA: { required: true, type: () => Boolean } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "profile": { type: Object } } }], [import("./songs/songs.controller"), { "SongsController": { "getAllSongs": { type: [t["./songs/songs.entity"].Song] }, "createSong": { type: t["./songs/songs.entity"].Song }, "findOne": { type: t["./songs/songs.entity"].Song } } }], [import("./users/user.controller"), { "UserController": { "getAPIKey": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "signUp": { type: t["./users/user.entity"].UserEntity }, "signIn": { type: Object }, "enable2fa": { type: Object }, "validate2fa": { type: Boolean }, "disable2fa": { type: Boolean } } }], [import("./artists/artists.controller"), { "ArtistsController": { "createArtist": { type: t["./artists/artist.entity"].ArtistEntity }, "findArtist": { type: t["./artists/artist.entity"].ArtistEntity } } }]] } };
};